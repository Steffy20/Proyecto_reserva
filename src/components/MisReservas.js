import React, { useEffect, useState } from 'react';
import './MisReservas.css';

function MisReservas({ usuario }) {
  const [misReservas, setMisReservas] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');

  useEffect(() => {
    const cargarReservas = () => {
      const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
      if (usuario) {
        const reservasFiltradas = reservasGuardadas.filter(
          (reserva) => reserva.usuario === usuario.nombre
        );
        setMisReservas(reservasFiltradas);
      }
    };

    cargarReservas();
  }, [usuario]);

  const eliminarReserva = (index) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta reserva?');
    if (!confirmar) return;

    const todasLasReservas = JSON.parse(localStorage.getItem('reservas')) || [];

    const reservasActualizadas = todasLasReservas.filter((reserva) => {
      return !(
        reserva.usuario === usuario.nombre &&
        reserva.restaurante === misReservas[index].restaurante &&
        reserva.fecha === misReservas[index].fecha &&
        reserva.hora === misReservas[index].hora &&
        reserva.personas === misReservas[index].personas
      );
    });

    localStorage.setItem('reservas', JSON.stringify(reservasActualizadas));

    // Recargar reservas del usuario
    const nuevasReservas = reservasActualizadas.filter(
      (reserva) => reserva.usuario === usuario.nombre
    );
    setMisReservas(nuevasReservas);
  };

   const iniciarEdicion = (index) => {
    setEditandoIndex(index);
    setNuevaFecha(misReservas[index].fecha);
    setNuevaHora(misReservas[index].hora);
  };

  const guardarCambio = (index) => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];

    const nuevaLista = reservasGuardadas.map((reserva) => {
      if (
        reserva.usuario === usuario.nombre &&
        reserva.restaurante === misReservas[index].restaurante &&
        reserva.fecha === misReservas[index].fecha &&
        reserva.hora === misReservas[index].hora &&
        reserva.personas === misReservas[index].personas
      ) {
        return {
          ...reserva,
          fecha: nuevaFecha,
          hora: nuevaHora,
        };
      }
      return reserva;
    });

    localStorage.setItem('reservas', JSON.stringify(nuevaLista));

    const nuevasReservas = nuevaLista.filter(
      (reserva) => reserva.usuario === usuario.nombre
    );
    setMisReservas(nuevasReservas);
    setEditandoIndex(null);
  };

  //Validación de inicio de sesión
  if (!usuario) {
    return <p>Debes iniciar sesión para ver tus reservas.</p>;
  }

  return (
    <div className="mis-reservas-container">
      <h2>Mis Reservas</h2>
      {misReservas.length === 0 ? (
        <p>No tienes reservas registradas.</p> //Validación de existencia de reservas
      ) : (
        <ul className="reserva-lista">
          {misReservas.map((reserva, index) => (
            <li key={index} className="reserva-item">
              <strong>Restaurante:</strong> {reserva.restaurante} <br />
                <strong>Fecha:</strong>{' '}
              {editandoIndex === index ? (
                <input
                  type="date"
                  value={nuevaFecha}
                  onChange={(e) => setNuevaFecha(e.target.value)}
                />
              ) : (
                reserva.fecha
              )}{' '}
              <br />
              <strong>Hora:</strong>{' '}
              {editandoIndex === index ? (
                <input
                  type="time"
                  value={nuevaHora}
                  onChange={(e) => setNuevaHora(e.target.value)}
                />
              ) : (
                reserva.hora
              )}
              <br />
              <strong>Personas:</strong> {reserva.personas} <br />
              <strong>Nombre del reservante:</strong> {reserva.usuario} <br />
              {editandoIndex === index ? (
                <button className="btn-guardar" onClick={() => guardarCambio(index)}>
                  Guardar cambio
                </button>
              ) : (
                <button className="btn-editar" onClick={() => iniciarEdicion(index)}>
                  Cambiar fecha
                </button>
              )}
              <button className="btn-eliminar" onClick={() => eliminarReserva(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisReservas;
