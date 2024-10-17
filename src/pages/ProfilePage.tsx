import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../services/favorites';
import { getPopularMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/Movie';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';

const ProfilePage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favorites = getFavorites();
      const movies = await getPopularMovies();
      const favoriteMoviesData = movies.filter(movie => favorites.includes(movie.id));
      setFavoriteMovies(favoriteMoviesData);
    };

    fetchFavoriteMovies();
  }, []);

  const removeFromFavorites = (movieId: number) => {
    removeFavorite(movieId);
    setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));

    setNotification('Movie removed from favorites!');

    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <>
      {/* <Header /> */}
      <Helmet>
        <title>Movie App - Profile</title>
        <meta name="description" content="View and manage your favorite movies on Movie App." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        {/* Rest of the component code... */}
      </div>
      <div className="container mx-auto px-4 py-8">
        {notification && (
          <div className="fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
            {notification}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">
          {username ? `${username}'s Favorite Movies` : 'Guest Favorite Movies'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onRemoveFromFavorites={() => removeFromFavorites(movie.id)} 
              isFavorite={true} // Set isFavorite ke true
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
