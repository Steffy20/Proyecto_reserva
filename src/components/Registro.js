import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  // Expresiones regulares
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  // Validaciones por campo
  const validarNombre = (valor) => {
    if (!valor) return "El nombre es obligatorio.";
    if (!nombreRegex.test(valor)) return "El nombre solo debe contener letras.";
    return "";
  };

  const validarCorreo = (valor) => {
    if (!valor) return "El correo es obligatorio.";
    if (!correoRegex.test(valor)) return "Formato de correo inválido.";
    return "";
  };

  const validarContrasena = (valor) => {
    if (!valor) return "La contraseña es obligatoria.";
    if (!contrasenaRegex.test(valor)) return "Debe tener al menos 6 caracteres, incluyendo letras y números.";
    return "";
  };

  const validarConfirmacion = (valor) => {
    if (valor !== contrasena) return "Las contraseñas no coinciden.";
    return "";
  };

  // Manejadores con validación inmediata
  const handleNombre = (e) => {
    const valor = e.target.value;
    setNombre(valor);
    setErrores((prev) => ({ ...prev, nombre: validarNombre(valor) }));
  };

  const handleCorreo = (e) => {
    const valor = e.target.value;
    setCorreo(valor);
    setErrores((prev) => ({ ...prev, correo: validarCorreo(valor) }));
  };

  const handleContrasena = (e) => {
    const valor = e.target.value;
    setContrasena(valor);
    setErrores((prev) => ({ ...prev, contrasena: validarContrasena(valor) }));
  };

  const handleConfirmar = (e) => {
    const valor = e.target.value;
    setConfirmarContrasena(valor);
    setErrores((prev) => ({ ...prev, confirmar: validarConfirmacion(valor) }));
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    const erroresValidados = {
      nombre: validarNombre(nombre),
      correo: validarCorreo(correo),
      contrasena: validarContrasena(contrasena),
      confirmar: validarConfirmacion(confirmarContrasena),
    };

    setErrores(erroresValidados);

    // Si hay errores, no continuar
    const hayErrores = Object.values(erroresValidados).some((err) => err !== "");
    if (hayErrores) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.some(u => u.correo === correo);
    if (existe) {
      setErrores((prev) => ({ ...prev, correo: "Este correo ya está registrado." }));
      return;
    }

    usuarios.push({ nombre, correo, contrasena, rol: 'usuario' });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={handleNombre}
            required
          />
          {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={handleCorreo}
            required
          />
          {errores.correo && <p style={{ color: 'red' }}>{errores.correo}</p>}

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={handleContrasena}
            required
          />
          {errores.contrasena && <p style={{ color: 'red' }}>{errores.contrasena}</p>}

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarContrasena}
            onChange={handleConfirmar}
            required
          />
          {errores.confirmar && <p style={{ color: 'red' }}>{errores.confirmar}</p>}

          <button type="submit">Registrarse</button>
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
