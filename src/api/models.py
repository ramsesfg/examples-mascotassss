from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'usuario'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=True)

    # Nuevos campos para la peluquería
    nombre: Mapped[str] = mapped_column(String(100), nullable=True)
    telefono: Mapped[str] = mapped_column(String(20), nullable=True)
    direccion: Mapped[str] = mapped_column(String(200), nullable=True)
    fecha_registro: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)

    # Relaciones
    mascotas: Mapped[list["Mascota"]] = relationship(
        back_populates="dueño", cascade="all, delete-orphan")
    citas: Mapped[list["Cita"]] = relationship(
        back_populates="cliente", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "direccion": self.direccion,
            "fecha_registro": self.fecha_registro.isoformat() if self.fecha_registro else None,
            "is_active": self.is_active
        }


class Mascota(db.Model):
    __tablename__ = 'mascota'

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    raza: Mapped[str] = mapped_column(String(100), nullable=False)
    edad: Mapped[int] = mapped_column(Integer, nullable=True)
    peso: Mapped[float] = mapped_column(Float, nullable=True)
    observaciones: Mapped[str] = mapped_column(Text, nullable=True)
    usuario_id: Mapped[int] = mapped_column(
        ForeignKey('usuario.id'), nullable=False)

    # Relaciones
    dueño: Mapped["User"] = relationship(back_populates="mascotas")
    citas: Mapped[list["Cita"]] = relationship(
        back_populates="mascota", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "raza": self.raza,
            "edad": self.edad,
            "peso": self.peso,
            "observaciones": self.observaciones,
            "usuario_id": self.usuario_id
        }


class Cita(db.Model):
    __tablename__ = 'cita'

    id: Mapped[int] = mapped_column(primary_key=True)
    fecha: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    servicio: Mapped[str] = mapped_column(String(100), nullable=False)
    # pendiente, confirmada, completada, cancelada
    estado: Mapped[str] = mapped_column(String(20), default='pendiente')
    notas: Mapped[str] = mapped_column(Text, nullable=True)
    precio: Mapped[float] = mapped_column(Float, nullable=True)
    usuario_id: Mapped[int] = mapped_column(
        ForeignKey('usuario.id'), nullable=False)
    mascota_id: Mapped[int] = mapped_column(
        ForeignKey('mascota.id'), nullable=False)
    fecha_creacion: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)

    # Relaciones
    cliente: Mapped["User"] = relationship(back_populates="citas")
    mascota: Mapped["Mascota"] = relationship(back_populates="citas")

    def serialize(self):
        return {
            "id": self.id,
            "fecha": self.fecha.isoformat(),
            "servicio": self.servicio,
            "estado": self.estado,
            "notas": self.notas,
            "precio": self.precio,
            "usuario_id": self.usuario_id,
            "mascota_id": self.mascota_id,
            "mascota_nombre": self.mascota.nombre if self.mascota else None,
            "fecha_creacion": self.fecha_creacion.isoformat()
        }
