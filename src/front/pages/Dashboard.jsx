import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { obtenerMascotas, obtenerCitas } from '../services/api';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Si no hay usuario logueado, redirigir al login
        if (!store.token) {
            navigate('/login');
            return;
        }

        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [mascotasData, citasData] = await Promise.all([
                obtenerMascotas(),
                obtenerCitas()
            ]);

            dispatch({ type: 'set_mascotas', payload: mascotasData });
            dispatch({ type: 'set_citas', payload: citasData });
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'logout' });
        navigate('/');
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

    const citasPendientes = store.citas.filter(c => c.estado === 'pendiente');
    const proximasCitas = store.citas
        .filter(c => new Date(c.fecha) >= new Date() && c.estado !== 'cancelada')
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 3);

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col">
                    <h2>¡Bienvenido, {store.user?.nombre}! 🐾</h2>
                    <p className="text-muted">Panel de control de tu peluquería canina</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Tarjetas de resumen */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h3 className="display-4">{store.mascotas.length}</h3>
                            <p className="card-text">Mascotas Registradas</p>
                            <Link to="/mascotas" className="btn btn-primary btn-sm">
                                Ver Mascotas
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h3 className="display-4">{store.citas.length}</h3>
                            <p className="card-text">Total de Citas</p>
                            <Link to="/citas" className="btn btn-primary btn-sm">
                                Ver Citas
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h3 className="display-4">{citasPendientes.length}</h3>
                            <p className="card-text">Citas Pendientes</p>
                            <Link to="/citas/nueva" className="btn btn-success btn-sm">
                                Nueva Cita
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="row mb-4">
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">⚡ Acciones Rápidas</h5>
                            <div className="d-flex gap-2 flex-wrap">
                                <Link to="/mascotas/nueva" className="btn btn-outline-primary">
                                    ➕ Agregar Mascota
                                </Link>
                                <Link to="/citas/nueva" className="btn btn-outline-success">
                                    📅 Agendar Cita
                                </Link>
                                <Link to="/perfil" className="btn btn-outline-info">
                                    👤 Mi Perfil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Próximas citas */}
            {proximasCitas.length > 0 && (
                <div className="row">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">📅 Próximas Citas</h5>
                                <div className="list-group">
                                    {proximasCitas.map(cita => (
                                        <div key={cita.id} className="list-group-item">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h6 className="mb-1">{cita.servicio}</h6>
                                                <small className="text-muted">
                                                    {new Date(cita.fecha).toLocaleDateString('es-ES')}
                                                </small>
                                            </div>
                                            <p className="mb-1">
                                                <strong>Mascota:</strong> {cita.mascota_nombre}
                                            </p>
                                            <small className="text-muted">
                                                Estado: <span className="badge bg-warning">{cita.estado}</span>
                                            </small>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};