import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  //Validación de correo electrónico
  const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!validarCorreo(correo)) {
      nuevosErrores.correo = 'Correo no válido';
    }

    if (contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    //Validación al enviar el formulario
    if (!validar()) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const admin = { correo: 'admin@admin.com', contrasena: 'admin123', rol: 'admin' };

    if (correo === admin.correo && contrasena === admin.contrasena) {
      localStorage.setItem('usuarioActivo', JSON.stringify(admin));
      setUser(admin);
      navigate('/admin');
      return;
    }

    //Validación de credenciales
    const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    if (usuario) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      setUser(usuario);
      navigate('/restaurantes');
    } else {
      setErrores({ general: 'Correo o contraseña incorrectos' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              if (errores.correo) validar(); // Validar en tiempo real
            }}
            required
          />
          
          {errores.correo && <p style={{ color: 'red' }}>{errores.correo}</p>} 

          <input
            type="password"
            placeholder="Contraseña" 
            value={contrasena}
            onChange={(e) => {
              setContrasena(e.target.value);
              if (errores.contrasena) validar(); // Validar en tiempo real
            }}
            required
          />
          {errores.contrasena && <p style={{ color: 'red' }}>{errores.contrasena}</p>}

          <button type="submit">Ingresar</button>
        </form>

        {errores.general && <p style={{ color: 'red' }}>{errores.general}</p>}

        <p>
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
