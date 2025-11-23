import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { obtenerCitas, eliminarCita } from '../ServiceApi.js';

export const CitasList = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // todas, pendientes, confirmadas, completadas

  useEffect(() => {
    if (!store.token) {
      navigate('/login');
      return;
    }
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const data = await obtenerCitas();
      dispatch({ type: 'set_citas', payload: data });
    } catch (error) {
      alert('Error al cargar citas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta cita?')) return;

    try {
      await eliminarCita(id);
      dispatch({ type: 'delete_cita', payload: id });
      alert('Cita eliminada exitosamente');
    } catch (error) {
      alert('Error al eliminar cita: ' + error.message);
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: 'bg-warning',
      confirmada: 'bg-info',
      completada: 'bg-success',
      cancelada: 'bg-danger'
    };
    return badges[estado] || 'bg-secondary';
  };

  const citasFiltradas = store.citas.filter(cita => {
    if (filtro === 'todas') return true;
    return cita.estado === filtro;
  });

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
        <h2>📅 Mis Citas</h2>
        <Link to="/citas/nueva" className="btn btn-success">
          ➕ Nueva Cita
        </Link>
      </div>

      {/* Filtros */}
      <div className="btn-group mb-4" role="group">
        <button 
          className={`btn btn-outline-primary ${filtro === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas ({store.citas.length})
        </button>
        <button 
          className={`btn btn-outline-warning ${filtro === 'pendiente' ? 'active' : ''}`}
          onClick={() => setFiltro('pendiente')}
        >
          Pendientes ({store.citas.filter(c => c.estado === 'pendiente').length})
        </button>
        <button 
          className={`btn btn-outline-info ${filtro === 'confirmada' ? 'active' : ''}`}
          onClick={() => setFiltro('confirmada')}
        >
          Confirmadas ({store.citas.filter(c => c.estado === 'confirmada').length})
        </button>
        <button 
          className={`btn btn-outline-success ${filtro === 'completada' ? 'active' : ''}`}
          onClick={() => setFiltro('completada')}
        >
          Completadas ({store.citas.filter(c => c.estado === 'completada').length})
        </button>
      </div>

      {citasFiltradas.length === 0 ? (
        <div className="alert alert-info text-center">
          <h4>No tienes citas {filtro !== 'todas' ? filtro + 's' : ''}</h4>
          <p>¡Agenda tu primera cita!</p>
          <Link to="/citas/nueva" className="btn btn-success">
            Nueva Cita
          </Link>
        </div>
      ) : (
        <div className="row">
          {citasFiltradas.map((cita) => (
            <div key={cita.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{cita.servicio}</h5>
                    <span className={`badge ${getEstadoBadge(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </div>
                  
                  <p className="card-text">
                    <strong>📅 Fecha:</strong> {new Date(cita.fecha).toLocaleString('es-ES', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}<br />
                    
                    <strong>🐾 Mascota:</strong> {cita.mascota_nombre}<br />
                    
                    {cita.precio && (
                      <>
                        <strong>💰 Precio:</strong> ${cita.precio}<br />
                      </>
                    )}
                    
                    {cita.notas && (
                      <>
                        <strong>📝 Notas:</strong><br />
                        <small className="text-muted">{cita.notas}</small>
                      </>
                    )}
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex gap-2">
                    <Link 
                      to={`/citas/editar/${cita.id}`} 
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                    >
                      ✏️ Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(cita.id)}
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