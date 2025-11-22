export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    // Nuevos estados para la peluquería
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    mascotas: [],
    citas: [],
    isLoading: false,
    error: null
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    // ========== AUTENTICACIÓN ==========
    case 'login_success':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };

    case 'logout':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...store,
        user: null,
        token: null,
        mascotas: [],
        citas: []
      };

    case 'update_user':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...store,
        user: action.payload
      };

    // ========== MASCOTAS ==========
    case 'set_mascotas':
      return {
        ...store,
        mascotas: action.payload
      };

    case 'add_mascota':
      return {
        ...store,
        mascotas: [...store.mascotas, action.payload]
      };

    case 'update_mascota':
      return {
        ...store,
        mascotas: store.mascotas.map(m =>
          m.id === action.payload.id ? action.payload : m
        )
      };

    case 'delete_mascota':
      return {
        ...store,
        mascotas: store.mascotas.filter(m => m.id !== action.payload)
      };

    // ========== CITAS ==========
    case 'set_citas':
      return {
        ...store,
        citas: action.payload
      };

    case 'add_cita':
      return {
        ...store,
        citas: [...store.citas, action.payload]
      };

    case 'update_cita':
      return {
        ...store,
        citas: store.citas.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    case 'delete_cita':
      return {
        ...store,
        citas: store.citas.filter(c => c.id !== action.payload)
      };

    // ========== LOADING Y ERRORES ==========
    case 'set_loading':
      return {
        ...store,
        isLoading: action.payload
      };

    case 'set_error':
      return {
        ...store,
        error: action.payload,
        isLoading: false
      };

    default:
      throw Error('Unknown action: ' + action.type);
  }
}