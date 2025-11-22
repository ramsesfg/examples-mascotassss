import React from 'react';
import { MessageCircle, Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #A8E6CF 0%, #7ECDA3 100%)',
      color: '#2c3e50',
      paddingTop: '3rem',
      paddingBottom: '1.5rem',
      borderTop: '5px solid #5CB85C'
    }}>
      <div className="container">
        <div className="row mb-4">
          
          {/* Sección Sobre Nosotros */}
          <div className="col-md-4 mb-4">
            <h3 style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '1rem' }}>
              🐾 Peluquería Canina
            </h3>
            <p style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
              Cuidamos a tu mejor amigo con amor y profesionalismo. 
              
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a 
                href="https://wa.me/56912345678" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  width: '50px',
                  height: '50px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#128C7E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#25D366';
                }}
                aria-label="WhatsApp"
              >
                <i class="fa-brands fa-whatsapp"></i>
                
              </a>
             
            </div>
          </div>

          {/* Sección Contacto */}
          <div className="col-md-4 mb-4">
            <h4 style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '1rem' }}>
              Contacto
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', color: '#2c3e50' }}>
                <MapPin size={20} style={{ color: '#5CB85C', marginTop: '2px', flexShrink: 0 }} />
                <span>Lima, Peru</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#2c3e50' }}>
                <Phone size={20} style={{ color: '#5CB85C', flexShrink: 0 }} />
                <a href="tel:+51973232677" style={{ color: '#2c3e50', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#5CB85C'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#2c3e50'}>
                  +51973232677
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2c3e50' }}>
                <Mail size={20} style={{ color: '#5CB85C', flexShrink: 0 }} />
                <a href="mailto:info@peluqueriacanina.cl" style={{ color: '#2c3e50', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = '#5CB85C'}
                   onMouseLeave={(e) => e.currentTarget.style.color = '#2c3e50'}>
                  wuinche55@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Sección Horarios */}
          <div className="col-md-4 mb-4">
            <h4 style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={24} />
              Horarios
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#2c3e50' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Lunes - Viernes:</span>
                <span>9:00 - 19:00</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Sábado:</span>
                <span>10:00 - 14:00</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 'bold' }}>Domingo:</span>
                <span style={{ color: '#e74c3c' }}>Cerrado</span>
              </li>
            </ul>
            <div style={{
              backgroundColor: '#C8F5E0',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '2px solid #7ECDA3'
            }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>
                🎉 ¡Reserva tu cita ahora por WhatsApp!
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div style={{ borderTop: '2px solid #7ECDA3', paddingTop: '1.5rem' }}>
          <div className="text-center" style={{ color: '#2c3e50' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              © {new Date().getFullYear()} Peluquería Canina. Todos los derechos reservados.
            </p>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              Hecho con 💚 y 🐾 para tu mejor amigo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};