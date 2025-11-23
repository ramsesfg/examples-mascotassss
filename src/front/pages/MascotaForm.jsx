import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { crearMascota, actualizarMascota } from '../ServiceApi.js';

export const MascotaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    raza: '',
    edad: '',
    peso: '',
    observaciones: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!store.token) {
      navigate('/login');
      return;
    }

    if (isEditing) {
      const mascota = store.mascotas.find(m => m.id === parseInt(id));
      if (mascota) {
        setFormData({
          nombre: mascota.nombre,
          raza: mascota.raza,
          edad: mascota.edad || '',
          peso: mascota.peso || '',
          observaciones: mascota.observaciones || ''
        });
      } else {
        alert('Mascota no encontrada');
        navigate('/mascotas');
      }
    }
  }, [id]);

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

    try {
      // Convertir campos numéricos
      const dataToSend = {
        ...formData,
        edad: formData.edad ? parseInt(formData.edad) : null,
        peso: formData.peso ? parseFloat(formData.peso) : null
      };

      if (isEditing) {
        const response = await actualizarMascota(id, dataToSend);
        dispatch({ type: 'update_mascota', payload: response.mascota });
        alert('¡Mascota actualizada exitosamente!');
      } else {
        const response = await crearMascota(dataToSend);
        dispatch({ type: 'add_mascota', payload: response.mascota });
        alert('¡Mascota registrada exitosamente!');
      }
      
      navigate('/mascotas');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {isEditing ? '✏️ Editar Mascota' : '➕ Nueva Mascota'}
              </h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre de la Mascota *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Max, Luna, Rocky"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Raza *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="raza"
                    value={formData.raza}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Labrador, Golden Retriever, Mestizo"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Edad (años)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="edad"
                      value={formData.edad}
                      onChange={handleChange}
                      min="0"
                      max="30"
                      placeholder="Ej: 3"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      min="0"
                      placeholder="Ej: 25.5"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Observaciones</label>
                  <textarea
                    className="form-control"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Cualquier información adicional importante (alergias, comportamiento, etc.)"
                  />
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Registrar')}
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/mascotas')}
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