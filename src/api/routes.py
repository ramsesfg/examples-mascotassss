"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Mascota, Cita
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


# ==================== RUTAS DE AUTENTICACIÓN ====================

@api.route('/registro', methods=['POST'])
def registro():
    """Registro de nuevo usuario"""
    try:
        data = request.get_json()

        # Validaciones
        if not data.get('nombre') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Nombre, email y password son requeridos'}), 400

        # Verificar si el email ya existe
        usuario_existente = User.query.filter_by(email=data['email']).first()
        if usuario_existente:
            return jsonify({'error': 'El email ya está registrado'}), 400

        # Crear nuevo usuario
        password_hash = bcrypt.generate_password_hash(
            data['password']).decode('utf-8')
        nuevo_usuario = User(
            nombre=data['nombre'],
            email=data['email'],
            telefono=data.get('telefono', ''),
            direccion=data.get('direccion', ''),
            password=password_hash,
            is_active=True
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({
            'mensaje': 'Usuario registrado exitosamente',
            'usuario': nuevo_usuario.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    """Login de usuario"""
    try:
        data = request.get_json()

        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email y password son requeridos'}), 400

        usuario = User.query.filter_by(email=data['email']).first()

        if not usuario or not bcrypt.check_password_hash(usuario.password, data['password']):
            return jsonify({'error': 'Credenciales inválidas'}), 401

        if not usuario.is_active:
            return jsonify({'error': 'Usuario inactivo'}), 401

        access_token = create_access_token(identity=usuario.id)

        return jsonify({
            'mensaje': 'Login exitoso',
            'token': access_token,
            'usuario': usuario.serialize()
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE USUARIOS ====================

@api.route('/usuario/perfil', methods=['GET'])
@jwt_required()
def obtener_perfil():
    """Obtener perfil del usuario autenticado"""
    try:
        usuario_id = get_jwt_identity()
        usuario = User.query.get(usuario_id)

        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        return jsonify(usuario.serialize()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/usuario/perfil', methods=['PUT'])
@jwt_required()
def actualizar_perfil():
    """Actualizar datos del usuario"""
    try:
        usuario_id = get_jwt_identity()
        usuario = User.query.get(usuario_id)

        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        data = request.get_json()

        # Actualizar campos permitidos
        if 'nombre' in data:
            usuario.nombre = data['nombre']
        if 'telefono' in data:
            usuario.telefono = data['telefono']
        if 'direccion' in data:
            usuario.direccion = data['direccion']
        if 'email' in data:
            # Verificar que el nuevo email no esté en uso
            email_existente = User.query.filter_by(email=data['email']).first()
            if email_existente and email_existente.id != usuario_id:
                return jsonify({'error': 'El email ya está en uso'}), 400
            usuario.email = data['email']

        # Cambiar contraseña si se proporciona
        if 'password' in data and data['password']:
            usuario.password = bcrypt.generate_password_hash(
                data['password']).decode('utf-8')

        db.session.commit()

        return jsonify({
            'mensaje': 'Perfil actualizado exitosamente',
            'usuario': usuario.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/usuario/perfil', methods=['DELETE'])
@jwt_required()
def eliminar_perfil():
    """Eliminar cuenta de usuario"""
    try:
        usuario_id = get_jwt_identity()
        usuario = User.query.get(usuario_id)

        if not usuario:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        db.session.delete(usuario)
        db.session.commit()

        return jsonify({'mensaje': 'Cuenta eliminada exitosamente'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE MASCOTAS ====================

@api.route('/mascotas', methods=['POST'])
@jwt_required()
def crear_mascota():
    """Crear nueva mascota"""
    try:
        usuario_id = get_jwt_identity()
        data = request.get_json()

        if not data.get('nombre') or not data.get('raza'):
            return jsonify({'error': 'Nombre y raza son requeridos'}), 400

        nueva_mascota = Mascota(
            nombre=data['nombre'],
            raza=data['raza'],
            edad=data.get('edad'),
            peso=data.get('peso'),
            observaciones=data.get('observaciones', ''),
            usuario_id=usuario_id
        )

        db.session.add(nueva_mascota)
        db.session.commit()

        return jsonify({
            'mensaje': 'Mascota registrada exitosamente',
            'mascota': nueva_mascota.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/mascotas', methods=['GET'])
@jwt_required()
def obtener_mascotas():
    """Obtener todas las mascotas del usuario"""
    try:
        usuario_id = get_jwt_identity()
        mascotas = Mascota.query.filter_by(usuario_id=usuario_id).all()

        return jsonify([mascota.serialize() for mascota in mascotas]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/mascotas/<int:mascota_id>', methods=['GET'])
@jwt_required()
def obtener_mascota(mascota_id):
    """Obtener una mascota específica"""
    try:
        usuario_id = get_jwt_identity()
        mascota = Mascota.query.filter_by(
            id=mascota_id, usuario_id=usuario_id).first()

        if not mascota:
            return jsonify({'error': 'Mascota no encontrada'}), 404

        return jsonify(mascota.serialize()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/mascotas/<int:mascota_id>', methods=['PUT'])
@jwt_required()
def actualizar_mascota(mascota_id):
    """Actualizar datos de mascota"""
    try:
        usuario_id = get_jwt_identity()
        mascota = Mascota.query.filter_by(
            id=mascota_id, usuario_id=usuario_id).first()

        if not mascota:
            return jsonify({'error': 'Mascota no encontrada'}), 404

        data = request.get_json()

        if 'nombre' in data:
            mascota.nombre = data['nombre']
        if 'raza' in data:
            mascota.raza = data['raza']
        if 'edad' in data:
            mascota.edad = data['edad']
        if 'peso' in data:
            mascota.peso = data['peso']
        if 'observaciones' in data:
            mascota.observaciones = data['observaciones']

        db.session.commit()

        return jsonify({
            'mensaje': 'Mascota actualizada exitosamente',
            'mascota': mascota.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/mascotas/<int:mascota_id>', methods=['DELETE'])
@jwt_required()
def eliminar_mascota(mascota_id):
    """Eliminar mascota"""
    try:
        usuario_id = get_jwt_identity()
        mascota = Mascota.query.filter_by(
            id=mascota_id, usuario_id=usuario_id).first()

        if not mascota:
            return jsonify({'error': 'Mascota no encontrada'}), 404

        db.session.delete(mascota)
        db.session.commit()

        return jsonify({'mensaje': 'Mascota eliminada exitosamente'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ==================== RUTAS DE CITAS ====================

@api.route('/citas', methods=['POST'])
@jwt_required()
def crear_cita():
    """Crear nueva cita"""
    try:
        usuario_id = get_jwt_identity()
        data = request.get_json()

        if not data.get('fecha') or not data.get('servicio') or not data.get('mascota_id'):
            return jsonify({'error': 'Fecha, servicio y mascota_id son requeridos'}), 400

        # Verificar que la mascota pertenezca al usuario
        mascota = Mascota.query.filter_by(
            id=data['mascota_id'], usuario_id=usuario_id).first()
        if not mascota:
            return jsonify({'error': 'Mascota no encontrada'}), 404

        # Convertir fecha
        try:
            fecha = datetime.fromisoformat(
                data['fecha'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'error': 'Formato de fecha inválido. Use ISO format'}), 400

        nueva_cita = Cita(
            fecha=fecha,
            servicio=data['servicio'],
            notas=data.get('notas', ''),
            precio=data.get('precio'),
            usuario_id=usuario_id,
            mascota_id=data['mascota_id'],
            estado='pendiente'
        )

        db.session.add(nueva_cita)
        db.session.commit()

        return jsonify({
            'mensaje': 'Cita creada exitosamente',
            'cita': nueva_cita.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/citas', methods=['GET'])
@jwt_required()
def obtener_citas():
    """Obtener todas las citas del usuario"""
    try:
        usuario_id = get_jwt_identity()
        citas = Cita.query.filter_by(
            usuario_id=usuario_id).order_by(Cita.fecha.desc()).all()

        return jsonify([cita.serialize() for cita in citas]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/citas/<int:cita_id>', methods=['GET'])
@jwt_required()
def obtener_cita(cita_id):
    """Obtener una cita específica"""
    try:
        usuario_id = get_jwt_identity()
        cita = Cita.query.filter_by(id=cita_id, usuario_id=usuario_id).first()

        if not cita:
            return jsonify({'error': 'Cita no encontrada'}), 404

        return jsonify(cita.serialize()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/citas/<int:cita_id>', methods=['PUT'])
@jwt_required()
def actualizar_cita(cita_id):
    """Actualizar cita"""
    try:
        usuario_id = get_jwt_identity()
        cita = Cita.query.filter_by(id=cita_id, usuario_id=usuario_id).first()

        if not cita:
            return jsonify({'error': 'Cita no encontrada'}), 404

        data = request.get_json()

        if 'fecha' in data:
            try:
                cita.fecha = datetime.fromisoformat(
                    data['fecha'].replace('Z', '+00:00'))
            except ValueError:
                return jsonify({'error': 'Formato de fecha inválido'}), 400

        if 'servicio' in data:
            cita.servicio = data['servicio']
        if 'estado' in data:
            cita.estado = data['estado']
        if 'notas' in data:
            cita.notas = data['notas']
        if 'precio' in data:
            cita.precio = data['precio']

        db.session.commit()

        return jsonify({
            'mensaje': 'Cita actualizada exitosamente',
            'cita': cita.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/citas/<int:cita_id>', methods=['DELETE'])
@jwt_required()
def eliminar_cita(cita_id):
    """Eliminar/cancelar cita"""
    try:
        usuario_id = get_jwt_identity()
        cita = Cita.query.filter_by(id=cita_id, usuario_id=usuario_id).first()

        if not cita:
            return jsonify({'error': 'Cita no encontrada'}), 404

        db.session.delete(cita)
        db.session.commit()

        return jsonify({'mensaje': 'Cita eliminada exitosamente'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
