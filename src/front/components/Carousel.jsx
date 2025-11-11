import { useState, useEffect } from 'react';

export const Carousel = ({ images, interval = 3000, autoPlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, images.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="carousel-peluqueria position-relative w-100 mb-4">
      {/* Contenedor de imágenes */}
      <div 
        className="carousel-images-container position-relative overflow-hidden rounded-4 shadow-lg" 
        style={{ height: '450px' }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-slide position-absolute w-100 h-100 transition-opacity ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transition: 'opacity 0.5s ease-in-out',
              opacity: index === currentIndex ? 1 : 0
            }}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Botón anterior */}
      <button
        onClick={goToPrevious}
        className="btn position-absolute top-50 start-0 translate-middle-y ms-3"
        style={{
          backgroundColor: '#FFB3D9',
          border: '3px solid #FF8FCC',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FF8FCC';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFB3D9';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Anterior"
      >
        <span className="fw-bold text-white" style={{ fontSize: '24px' }}>‹</span>
      </button>

      {/* Botón siguiente */}
      <button
        onClick={goToNext}
        className="btn position-absolute top-50 end-0 translate-middle-y me-3"
        style={{
          backgroundColor: '#FFB3D9',
          border: '3px solid #FF8FCC',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FF8FCC';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFB3D9';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Siguiente"
      >
        <span className="fw-bold text-white" style={{ fontSize: '24px' }}>›</span>
      </button>

      {/* Botón play/pause */}
      <button
        onClick={togglePlayPause}
        className="btn position-absolute top-0 end-0 m-3"
        style={{
          backgroundColor: '#B8E986',
          border: '3px solid #8FD14F',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#8FD14F';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#B8E986';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        <span className="fw-bold text-white" style={{ fontSize: '18px' }}>
          {isPlaying ? '❚❚' : '▶'}
        </span>
      </button>

      {/* Indicadores */}
      <div 
        className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2"
        style={{ zIndex: 10 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="btn p-0 border-0"
            style={{
              width: index === currentIndex ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === currentIndex ? '#FFB3D9' : 'rgba(255, 179, 217, 0.5)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 179, 217, 0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 179, 217, 0.5)';
              }
            }}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};