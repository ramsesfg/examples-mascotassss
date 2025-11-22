import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { crearCita, actualizarCita, obtenerMascotas } from '../services/api';

export const CitaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    fecha: '',
    servicio: '',
    mascota_id: '',
    estado: 'pendiente',
    notas: '',
    precio: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const servicios = [
    'Baño',
    'Corte de Pelo',
    'Baño y Corte',
    'Corte de Uñas',
    'Limpieza de Oídos',
    'Spa Completo',
    'Deslanado',
    'Tratamiento Antipulgas',
    'Otro'
  ];

  useEffect(() => {
    if (!store.token) {
      navigate('/login');
      return;
    }

    // Cargar mascotas si no están cargadas
    if (store.mascotas.length === 0) {
      cargarMascotas();
    }

    if (isEditing) {
      const cita = store.citas.find(c => c.id === parseInt(id));
      if (cita) {
        // Convertir fecha al formato datetime-local
        const fechaLocal = new Date(cita.fecha).toISOString().slice(0, 16);
        setFormData({
          fecha: fechaLocal,
          servicio: cita.servicio,
          mascota_id: cita.mascota_id,
          estado: cita.estado,
          notas: cita.notas || '',
          precio: cita.precio || ''
        });
      } else {
        alert('Cita no encontrada');
        navigate('/citas');
      }
    }
  }, [id]);

  const cargarMascotas = async () => {
    try {
      const data = await obtenerMascotas();
      dispatch({ type: 'set_mascotas', payload: data });
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validar que haya al menos una mascota
    if (store.mascotas.length === 0) {
      setError('Debes registrar al menos una mascota antes de crear una cita');
      setLoading(false);
      return;
    }

    try {
      // Convertir fecha a ISO format
      const dataToSend = {
        ...formData,
        mascota_id: parseInt(formData.mascota_id),
        precio: formData.precio ? parseFloat(formData.precio) : null,
        fecha: new Date(formData.fecha).toISOString()
      };

      if (isEditing) {
        const response = await actualizarCita(id, dataToSend);
        dispatch({ type: 'update_cita', payload: response.cita });
        alert('¡Cita actualizada exitosamente!');
      } else {
        const response = await crearCita(dataToSend);
        dispatch({ type: 'add_cita', payload: response.cita });
        alert('¡Cita creada exitosamente!');
      }
      
      navigate('/citas');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (store.mascotas.length === 0 && !isEditing) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <h4>⚠️ No tienes mascotas registradas</h4>
          <p>Debes registrar al menos una mascota antes de crear una cita.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/mascotas/nueva')}
          >
            Registrar Mascota
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {isEditing ? '✏️ Editar Cita' : '➕ Nueva Cita'}
              </h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Fecha y Hora *</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Servicio *</label>
                  <select
                    className="form-select"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicios.map((servicio) => (
                      <option key={servicio} value={servicio}>
                        {servicio}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Mascota *</label>
                  <select
                    className="form-select"
                    name="mascota_id"
                    value={formData.mascota_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una mascota</option>
                    {store.mascotas.map((mascota) => (
                      <option key={mascota.id} value={mascota.id}>
                        {mascota.nombre} - {mascota.raza}
                      </option>
                    ))}
                  </select>
                </div>

                {isEditing && (
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Precio (opcional)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    min="0"
                    placeholder="Ej: 25000"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Notas Adicionales</label>
                  <textarea
                    className="form-control"
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Cualquier información adicional sobre la cita"
                  />
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : (isEditing ? 'Actualizar Cita' : 'Crear Cita')}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/citas')}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CitaForm;