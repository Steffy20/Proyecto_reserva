import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservaForm.css';

function ReservaForm({ restaurante, onReserva, onCancelar, usuario }) {
  const [nombre] = useState(usuario?.nombre || '');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState(1);

  const navigate = useNavigate();

  // Obtener fecha mínima (hoy) y fecha máxima (6 meses después) en formato yyyy-mm-dd
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const hoyStr = hoy.toISOString().split('T')[0];

  const seisMesesDespues = new Date(hoy);
  seisMesesDespues.setMonth(seisMesesDespues.getMonth() + 6);
  const maxFechaStr = seisMesesDespues.toISOString().split('T')[0];

  const handleConfirmar = (e) => {
    e.preventDefault();

    //Validación de campos vacíos
    if (!fecha || !hora || personas < 1) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const fechaSeleccionada = new Date(fecha);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    //Validación de que la fecha no sea anterior a hoy
    if (fechaSeleccionada < hoy) {
      alert('La fecha de la reserva no puede ser anterior a hoy.');
      return;
    }

    //Validación de que la fecha no sea mayor a 6 meses desde hoy
    if (fechaSeleccionada > seisMesesDespues) {
      alert('La fecha de la reserva no puede ser mayor a 6 meses desde hoy.');
      return;
    }

    const nuevaReserva = {
      nombreReservante: nombre,
      fecha,
      hora,
      personas,
      restaurante: restaurante.nombre,
      usuario: usuario.nombre, // identificador del usuario logueado
    };

    // Obtener reservas existentes
    const reservasExistentes = JSON.parse(localStorage.getItem('reservas')) || [];

    // Agregar nueva reserva
    reservasExistentes.push(nuevaReserva);

    // Guardar en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservasExistentes));

    if (onReserva) {
      onReserva(nuevaReserva);
    }

    navigate('/mis-reservas');
  };

  const handleCancelar = () => {
    if (onCancelar) onCancelar();
    navigate('/restaurantes');
  };

  return (
    <div className="reserva-form-container">
      <h2>Reserva en {restaurante.nombre}</h2>
      <form onSubmit={handleConfirmar}>
        <label htmlFor="nombre">Nombre del reservante</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          readOnly
        />

        <label htmlFor="fecha">Fecha</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          min={hoyStr}
          max={maxFechaStr}
        />

        <label htmlFor="hora">Hora</label>
        <input
          type="time"
          id="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />

        <label htmlFor="personas">Número de personas</label>
        <input
          type="number"
          id="personas"
          min="1"
          value={personas}
          onChange={(e) => setPersonas(parseInt(e.target.value, 10) || 1)}
          required
        />

        <div className="botones-reserva">
          <button type="submit" className="btn-confirmar">Confirmar Reserva</button>
          <button type="button" className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ReservaForm;
