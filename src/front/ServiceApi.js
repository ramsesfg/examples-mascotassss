const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

// Función auxiliar para hacer peticiones
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...options
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error en la petición');
  }

  return data;
};

// ========== AUTENTICACIÓN ==========
export const registro = async (userData) => {
  return await fetchAPI('/registro', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

export const login = async (credentials) => {
  return await fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

// ========== USUARIO ==========
export const obtenerPerfil = async () => {
  return await fetchAPI('/usuario/perfil');
};

export const actualizarPerfil = async (userData) => {
  return await fetchAPI('/usuario/perfil', {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
};

export const eliminarPerfil = async () => {
  return await fetchAPI('/usuario/perfil', {
    method: 'DELETE'
  });
};

// ========== MASCOTAS ==========
export const obtenerMascotas = async () => {
  return await fetchAPI('/mascotas');
};

export const crearMascota = async (mascotaData) => {
  return await fetchAPI('/mascotas', {
    method: 'POST',
    body: JSON.stringify(mascotaData)
  });
};

export const actualizarMascota = async (id, mascotaData) => {
  return await fetchAPI(`/mascotas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(mascotaData)
  });
};

export const eliminarMascota = async (id) => {
  return await fetchAPI(`/mascotas/${id}`, {
    method: 'DELETE'
  });
};

// ========== CITAS ==========
export const obtenerCitas = async () => {
  return await fetchAPI('/citas');
};

export const crearCita = async (citaData) => {
  return await fetchAPI('/citas', {
    method: 'POST',
    body: JSON.stringify(citaData)
  });
};

export const actualizarCita = async (id, citaData) => {
  return await fetchAPI(`/citas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(citaData)
  });
};

export const eliminarCita = async (id) => {
  return await fetchAPI(`/citas/${id}`, {
    method: 'DELETE'
  });
};