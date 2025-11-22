import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { actualizarPerfil, eliminarPerfil } from '../services/api';

export const Perfil = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  
  const [formData, setFormData] = useState({
    nombre: store.user?.nombre || '',
    email: store.user?.email || '',
    telefono: store.user?.telefono || '',
    direccion: store.user?.direccion || '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Solo enviar password si se llenó
      const dataToSend = { ...formData };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      const response = await actualizarPerfil(dataToSend);
      
      dispatch({
        type: 'update_user',
        payload: response.usuario
      });
      
      setSuccess('¡Perfil actualizado exitosamente!');
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await eliminarPerfil();
      dispatch({ type: 'logout' });
      alert('Tu cuenta ha sido eliminada exitosamente');
      navigate('/');
    } catch (err) {
      alert('Error al eliminar la cuenta: ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">👤 Mi Perfil</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nueva Contraseña (dejar en blanco para no cambiar)</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                  />
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancelar
                  </button>
                </div>
              </form>

              <hr className="my-4" />

              <div className="alert alert-danger">
                <h5 className="alert-heading">Zona Peligrosa</h5>
                <p className="mb-2">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten certeza.</p>
                
                {!showDeleteConfirm ? (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Eliminar mi cuenta
                  </button>
                ) : (
                  <div>
                    <p className="fw-bold">¿Estás seguro? Esta acción no se puede deshacer.</p>
                    <button 
                      className="btn btn-danger btn-sm me-2"
                      onClick={handleDeleteAccount}
                    >
                      Sí, eliminar mi cuenta
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};