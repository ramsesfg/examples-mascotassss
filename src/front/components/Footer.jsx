import React from 'react';
import { MessageCircle, Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Sección Sobre Nosotros */}
          <div>
            <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              🐾 Peluquería Canina
            </h3>
            <p className="text-gray-700 mb-4">
              Cuidamos a tu mejor amigo con amor y profesionalismo. 
              Más de 10 años de experiencia haciendo felices a las mascotas.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/56912345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
              <a 
                href="https://instagram.com/tupeluqueriacanina" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://facebook.com/tupeluqueriacanina" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Sección Contacto */}
          <div>
            <h4 className="text-xl font-bold text-purple-700 mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <MapPin size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                <span>Av. Principal 123, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Phone size={20} className="text-purple-600 flex-shrink-0" />
                <a href="tel:+56912345678" className="hover:text-purple-600 transition-colors">
                  +569 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Mail size={20} className="text-purple-600 flex-shrink-0" />
                <a href="mailto:info@peluqueriacanina.cl" className="hover:text-purple-600 transition-colors">
                  info@peluqueriacanina.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Sección Horarios */}
          <div>
            <h4 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <Clock size={24} />
              Horarios
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span className="font-semibold">Lunes - Viernes:</span>
                <span>9:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Sábado:</span>
                <span>10:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Domingo:</span>
                <span className="text-red-500">Cerrado</span>
              </li>
            </ul>
            <div className="mt-4 bg-purple-200 p-3 rounded-lg">
              <p className="text-sm font-semibold text-purple-800">
                🎉 ¡Reserva tu cita ahora por WhatsApp!
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-purple-300 pt-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              © {new Date().getFullYear()} Peluquería Canina. Todos los derechos reservados.
            </p>
            <p className="text-sm">
              Hecho con 💜 y 🐾 para tu mejor amigo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};


