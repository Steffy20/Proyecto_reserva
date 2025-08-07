
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Registro from './components/Registro';
import RestauranteList from './components/RestauranteList';
import ReservaForm from './components/ReservaForm';
import MisReservas from './components/MisReservas';
import MisReseñas from './components/MisReseñas';
import Contacto from './components/Contacto';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [reservas, setReservas] = useState([]);

  //Validación de sesión activa al iniciar la app
  useEffect(() => {
    const guardado = localStorage.getItem('usuarioActivo');
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  const manejarLogin = (usuarioLogueado) => {
    setUsuario(usuarioLogueado);
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioLogueado));
  };

  const manejarCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuario(null);
    setRestauranteSeleccionado(null);
    setReservas([]);
  };

  const handleReservar = (restaurante) => {
    setRestauranteSeleccionado(restaurante);
  };

  //Validación al guardar reserva (verifica usuario activo)
  const handleGuardarReserva = (reserva) => {
    if (!usuario) {
      alert('No hay usuario autenticado. Por favor, inicia sesión.');
      return;
    }
    const reservaConUsuario = { ...reserva, usuarioCorreo: usuario.correo };
    setReservas([...reservas, reservaConUsuario]);
    setRestauranteSeleccionado(null);
  };

  const RutaProtegidaUsuario = ({ children }) => {
    if (!usuario ) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar usuario={usuario} onCerrarSesion={manejarCerrarSesion} />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/login"
          element={
            usuario ? (
              <Navigate to="/restaurantes" />
            ) : (
              <Login setUser={manejarLogin} />
            )
          }
        />

        <Route
          path="/registro"
          element={
            usuario ? (
              <Navigate to="/restaurantes" />
            ) : (
              <Registro />
            )
          }
        />

        <Route
          path="/restaurantes"
          element={
            <RutaProtegidaUsuario>
              {!restauranteSeleccionado ? (
                <RestauranteList onSeleccionar={handleReservar} />
              ) : (
                <ReservaForm
                  restaurante={restauranteSeleccionado}
                  onReserva={handleGuardarReserva}
                  onCancelar={() => setRestauranteSeleccionado(null)}
                  usuario={usuario}
                />
              )}
            </RutaProtegidaUsuario>
          }
        />

        <Route
          path="/mis-reservas"
          element={
            <RutaProtegidaUsuario>
              <MisReservas usuario={usuario} />
            </RutaProtegidaUsuario>
          }
        />

        <Route
          path="/mis-resenas"
          element={
            <RutaProtegidaUsuario>
              <MisReseñas usuario={usuario} />
            </RutaProtegidaUsuario>
          }
        />

        <Route
          path="/contacto"
          element={
            <RutaProtegidaUsuario>
              <Contacto />
            </RutaProtegidaUsuario>
          }
        />

        {
          
        }

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
