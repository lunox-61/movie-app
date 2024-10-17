import React from 'react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onAddToFavorites?: (movieId: number) => void;
  onRemoveFromFavorites?: (movieId: number) => void;
  isFavorite?: boolean; // Tambahkan prop ini
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  return (
    <div className="border rounded shadow p-4">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto mb-4" />
      <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
      <p className="text-sm mb-4">{movie.overview}</p>
      
      {!isFavorite && onAddToFavorites && (
        <button 
          onClick={() => onAddToFavorites(movie.id)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Favorites
        </button>
      )}

      {isFavorite && onRemoveFromFavorites && (
        <button 
          onClick={() => onRemoveFromFavorites(movie.id)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
};

export default MovieCard;
