import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ usuario, onCerrarSesion }) {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    // No se elimina nada del localStorage
    onCerrarSesion(); // Solo limpia el estado React
    navigate('/'); // Redirige al inicio
  };

  //Validación de sesión de usuario
  if (!usuario) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/restaurantes">ReservaFacil</Link>
      </div>

      <ul className="navbar-links">
        {usuario.rol === 'usuario' && (
          <>
            <li><Link to="/mis-reservas">Mis Reservas</Link></li>
            <li><Link to="/mis-resenas">Mis Reseñas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </>
        )}

  

        <li>
          <button onClick={handleCerrarSesion} className="cerrar-sesion-btn">
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
