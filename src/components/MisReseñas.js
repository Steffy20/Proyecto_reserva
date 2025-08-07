import React, { useState, useEffect } from 'react';
import './MisReseñas.css';

function MisResenas({ usuario }) {
  const [reseñas, setReseñas] = useState([]);
  const [nuevaResena, setNuevaResena] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [resenaEditada, setResenaEditada] = useState('');
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState('');

  useEffect(() => {
    // Verificar si ya hay restaurantes en localStorage
    const existentes = JSON.parse(localStorage.getItem('restaurantes')) || [];
    if (existentes.length === 0) {
      const predeterminados = [
        { id: 1, nombre: 'La Novia del Toro' },
        { id: 2, nombre: 'Martinica Restaurante' },
        { id: 3, nombre: 'Cevichería El Refugio' },
        { id: 4, nombre: 'Mooi Cafetería' },
        { id: 5, nombre: 'Manta’s Pizza' },
        { id: 6, nombre: 'La Panka' },
        { id: 7, nombre: 'La Canoa Restaurante' },
        { id: 8, nombre: 'Restaurante El Girasol' },
      ];
      localStorage.setItem('restaurantes', JSON.stringify(predeterminados));
      setRestaurantes(predeterminados);
    } else {
      setRestaurantes(existentes);
    }
  }, []);

  useEffect(() => {
    // Cargar reseñas del usuario
    const todasResenas = JSON.parse(localStorage.getItem('resenas')) || [];
    const misResenas = todasResenas.filter(r => r.usuarioCorreo === usuario.correo);
    setReseñas(misResenas);
  }, [usuario]);

  const guardarEnLocalStorage = (resenasActualizadas) => {
    const todasResenas = JSON.parse(localStorage.getItem('resenas')) || [];
    const otrasResenas = todasResenas.filter(r => r.usuarioCorreo !== usuario.correo);
    localStorage.setItem('resenas', JSON.stringify([...otrasResenas, ...resenasActualizadas]));
  };

  //Validacion Prevenir reseñas vacías
  const handleCrearResena = () => {
    if (!nuevaResena.trim()) {
      alert('La reseña no puede estar vacía');
      return;
    }
    if (!restauranteSeleccionado) {
      alert('Debes seleccionar un restaurante');
      return;
    }

    const nueva = {
      texto: nuevaResena,
      usuarioCorreo: usuario.correo,
      restaurante: restauranteSeleccionado
    };

    const resenasActualizadas = [...reseñas, nueva];
    setReseñas(resenasActualizadas);
    guardarEnLocalStorage(resenasActualizadas);
    setNuevaResena('');
    setRestauranteSeleccionado('');
  };

  const handleEliminarResena = (index) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta reseña?')) return;
    const resenasActualizadas = reseñas.filter((_, i) => i !== index);
    setReseñas(resenasActualizadas);
    guardarEnLocalStorage(resenasActualizadas);
  };

  const iniciarEdicion = (index) => {
    setEditandoIndex(index);
    setResenaEditada(reseñas[index].texto);
  };

  const cancelarEdicion = () => {
    setEditandoIndex(null);
    setResenaEditada('');
  };

  //Validacion Impedir que el usuario guarde una edición vacía de la reseña
  const guardarEdicion = (index) => {
    if (!resenaEditada.trim()) {
      alert('La reseña no puede estar vacía');
      return;
    }
    const resenasActualizadas = [...reseñas];
    resenasActualizadas[index].texto = resenaEditada;
    setReseñas(resenasActualizadas);
    guardarEnLocalStorage(resenasActualizadas);
    setEditandoIndex(null);
    setResenaEditada('');
  };

  return (
    <div className="mis-resenas-container">
      <h2>Mis Reseñas</h2>

      <div className="crear-resena">
        <select
          value={restauranteSeleccionado}
          onChange={(e) => setRestauranteSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un restaurante</option>
          {restaurantes.map((r) => (
            <option key={r.id} value={r.nombre}>{r.nombre}</option>
          ))}
        </select>

        <textarea
          placeholder="Escribe tu nueva reseña aquí..."
          value={nuevaResena}
          onChange={(e) => setNuevaResena(e.target.value)}
          rows={3}
        />
        <button onClick={handleCrearResena}>Crear Reseña</button>
      </div>

      {reseñas.length === 0 ? (
        <p>No tienes reseñas registradas.</p>
      ) : (
        <ul className="lista-resenas">
          {reseñas.map((resena, index) => (
            <li key={index} className="resena-item">
              {editandoIndex === index ? (
                <>
                  <textarea
                    value={resenaEditada}
                    onChange={(e) => setResenaEditada(e.target.value)}
                    rows={3}
                  />
                  <button onClick={() => guardarEdicion(index)}>Guardar</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                </>
              ) : (
                <>
                  <strong>Restaurante:</strong> {resena.restaurante}<br />
                  <p>{resena.texto}</p>
                  <div className="botones-resena">
                    <button onClick={() => iniciarEdicion(index)}>Modificar</button>
                    <button onClick={() => handleEliminarResena(index)}>Eliminar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisResenas;
