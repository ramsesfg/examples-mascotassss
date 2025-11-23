import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { obtenerMascotas, eliminarMascota } from '../ServiceApi.js';

export const MascotasList = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store.token) {
      navigate('/login');
      return;
    }
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    try {
      const data = await obtenerMascotas();
      dispatch({ type: 'set_mascotas', payload: data });
    } catch (error) {
      alert('Error al cargar mascotas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de eliminar a ${nombre}?`)) return;

    try {
      await eliminarMascota(id);
      dispatch({ type: 'delete_mascota', payload: id });
      alert('Mascota eliminada exitosamente');
    } catch (error) {
      alert('Error al eliminar mascota: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🐕 Mis Mascotas</h2>
        <Link to="/mascotas/nueva" className="btn btn-primary">
          ➕ Agregar Mascota
        </Link>
      </div>

      {store.mascotas.length === 0 ? (
        <div className="alert alert-info text-center">
          <h4>No tienes mascotas registradas</h4>
          <p>¡Agrega tu primera mascota para comenzar!</p>
          <Link to="/mascotas/nueva" className="btn btn-primary">
            Agregar Mascota
          </Link>
        </div>
      ) : (
        <div className="row">
          {store.mascotas.map((mascota) => (
            <div key={mascota.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">🐾 {mascota.nombre}</h5>
                  <p className="card-text">
                    <strong>Raza:</strong> {mascota.raza}<br />
                    {mascota.edad && (
                      <>
                        <strong>Edad:</strong> {mascota.edad} años<br />
                      </>
                    )}
                    {mascota.peso && (
                      <>
                        <strong>Peso:</strong> {mascota.peso} kg<br />
                      </>
                    )}
                    {mascota.observaciones && (
                      <>
                        <strong>Observaciones:</strong><br />
                        <small className="text-muted">{mascota.observaciones}</small>
                      </>
                    )}
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex gap-2">
                    <Link 
                      to={`/mascotas/editar/${mascota.id}`} 
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                    >
                      ✏️ Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(mascota.id, mascota.nombre)}
                      className="btn btn-sm btn-outline-danger flex-grow-1"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-secondary">
          ← Volver al Dashboard
        </Link>
      </div>
    </div>
  );
};