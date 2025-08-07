
import React from 'react';
import './RestauranteList.css';

const restaurantes = [
  {
    id: 1,
    nombre: 'La Novia del Toro',
    descripcion: 'Especialista en hamburguesas artesanales, sánduches y su famoso “sartenazo” mixto.',
    imagen: 'img/fondo2.jpg',
  },
  {
    id: 2,
    nombre: 'Martinica Restaurante',
    descripcion: 'Alta cocina ecuatoriana e internacional con énfasis en mariscos y ceviches gourmet.',
    imagen: 'img/Martinica.jpg',
  },
  {
    id: 3,
    nombre: 'Cevichería El Refugio',
    descripcion: 'Ceviches tradicionales estilo Jipijapa y sopa marinera con auténtico sabor manabita.',
    imagen: 'img/Ceviche.jpg',
  },
  {
    id: 4,
    nombre: 'Mooi Cafetería',
    descripcion: 'Brunch, café de especialidad y platos saludables en un ambiente moderno y tranquilo.',
    imagen: 'img/fondo 4.jpg',
  },
  {
    id: 5,
    nombre: 'Manta’s Pizza',
    descripcion: 'Pizzas artesanales al estilo flatbread con ingredientes frescos y sabores variados.',
    imagen: 'img/pizza.jpeg',
  },
  {
    id: 6,
    nombre: 'La Panka',
    descripcion: 'Auténtica comida peruana, con pollo a la brasa, anticuchos y platos criollos.',
    imagen: 'img/64f61fd087d7fd36b810b7d0.jpg',
  },
  {
    id: 7,
    nombre: 'La Canoa Restaurante',
    descripcion: 'Pescado y mariscos frescos a la parrilla con sabor casero y ambiente familiar.',
    imagen: 'img/342edeffe445b62fe430c3401c55cc07.jpeg',
  },
  {
    id: 8,
    nombre: 'Restaurante El Girasol',
    descripcion: 'Parrilladas ecuatorianas con carne asada, chuletas, chorizo, arroz y menestra.',
    imagen: 'img/parrilladas.jpg',
  },
];

function RestauranteList({ onSeleccionar }) {
  const imagenDefault = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';

  return (

    <div className="restaurante-list">
      {restaurantes.map((restaurante) => (
        <div key={restaurante.id} className="restaurante-card">
          <img
            src={restaurante.imagen || imagenDefault}
            alt={`Imagen de ${restaurante.nombre}`}
            className="restaurante-img"
          />
          <h3>{restaurante.nombre}</h3>
          <p>{restaurante.descripcion}</p>
          <button onClick={() => onSeleccionar(restaurante)}>Reservar Mesa</button>
        </div>
      ))}
    </div>
  );
}

export default RestauranteList;
