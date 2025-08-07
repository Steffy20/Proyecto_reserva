import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <h1 className="inicio-titulo">
        Bienvenido a <span>ReservaFacil</span>
      </h1>
      <p className="inicio-descripcion">
        Encuentra los mejores restaurantes y haz tu reserva fácil y rápido.
      </p>
      <div className="inicio-botones">
        <button
          className="inicio-boton boton-login"
          onClick={() => navigate('/login')}
        >
          Iniciar Sesión
        </button>
        <button
          className="inicio-boton boton-registro"
          onClick={() => navigate('/registro')}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Inicio;
