import React from 'react';
import './Contacto.css';

function Contacto() {
  return (
    <div className="contacto-container">
      <h2>Contáctanos</h2>

      <div className="contacto-cards">

        <div className="card">
          <div className="icon" aria-label="Dirección">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#4caf50" viewBox="0 0 24 24" width="36" height="36"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
          </div>
          <h3>Dirección</h3>
          <p>Av. Flavio reyes entre calle 26 y 27</p>
        </div>

        <div className="card">
          <div className="icon" aria-label="Teléfono">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#4caf50" viewBox="0 0 24 24" width="36" height="36"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C7.61 21.44 2.56 16.39 2.56 10a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.2 1.1l-2.2 2.21z"/></svg>
          </div>
          <h3>Teléfono</h3>
          <p>099 367 9742</p>
        </div>

        <div className="card">
          <div className="icon" aria-label="Correo electrónico">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#4caf50" viewBox="0 0 24 24" width="36" height="36"><path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <h3>Correo Electrónico</h3>
          <p>ReservaFacil@gmail.com</p>
        </div>

        <div className="card">
          <div className="icon" aria-label="Horario">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#4caf50" viewBox="0 0 24 24" width="36" height="36"><path d="M12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          </div>
          <h3>Horario de Atención</h3>
          <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
        </div>

        <div className="card redes">
          <div className="icon" aria-label="Redes sociales">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#4caf50" viewBox="0 0 24 24" width="36" height="36"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.66 8.66 0 01-2.72 1.04 4.27 4.27 0 00-7.27 3.9A12.12 12.12 0 013 4.89a4.27 4.27 0 001.32 5.7 4.22 4.22 0 01-1.93-.53v.05a4.27 4.27 0 003.42 4.18 4.3 4.3 0 01-1.92.07 4.27 4.27 0 003.98 2.97A8.56 8.56 0 012 19.54a12.07 12.07 0 006.54 1.92c7.85 0 12.15-6.5 12.15-12.14 0-.19 0-.39-.01-.58A8.64 8.64 0 0024 6.5a8.3 8.3 0 01-2.54.7z"/></svg>
          </div>
          <h3>Síguenos en redes sociales</h3>
          <p>
            <a href="https://facebook.com/tupagina" target="_blank" rel="noopener noreferrer" className="redes-link facebook">
              Facebook
            </a>
            <a href="https://twitter.com/tupagina" target="_blank" rel="noopener noreferrer" className="redes-link twitter">
              Twitter
            </a>
            <a href="https://instagram.com/tupagina" target="_blank" rel="noopener noreferrer" className="redes-link instagram">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
