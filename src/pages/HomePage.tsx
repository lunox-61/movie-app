import React, { useState, useEffect } from 'react';
import { getNowPlayingMovies, getPopularMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { addFavorite } from '../services/favorites';
import { Movie } from '../types/Movie';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [notification, setNotification] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false); 

  // Fetch initial movies (Now Playing and Popular Movies)
  useEffect(() => {
    const fetchMovies = async () => {
      const nowPlayingData = await getNowPlayingMovies();
      setNowPlaying(nowPlayingData.slice(0, 6)); // Set Now Playing movies with limit 6

      // Fetch first two pages of Popular Movies to get 30 movies
      const popularMoviesPage1 = await getPopularMovies(1);
      const popularMoviesPage2 = await getPopularMovies(2);
      const popularMoviesData = [...popularMoviesPage1, ...popularMoviesPage2];
      
      // Set popular movies with the first 30 movies
      setPopularMovies(popularMoviesData.slice(0, 30));
    };
    
    fetchMovies();
  }, []);  

  const loadMoreMovies = async () => {
    const newPage = page + 1;
    const moreMovies = await getPopularMovies(newPage);
    setPopularMovies([...popularMovies, ...moreMovies.slice(0, 6)]);
    setPage(newPage);
  };

  const handleAddToFavorites = (movieId: number) => {
    addFavorite(movieId);
    setNotification('Movie added to favorites!'); 
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Movie App - Home</title>
        <meta name="description" content="Discover the latest and popular movies on Movie App." />
        <meta name="keywords" content="movies, popular, now playing, movie app" />
        <meta name="author" content="Your Name" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        {/* Rest of the component code... */}
      </div>
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-8">

        {/* Floating notification below header */}
        {notification && (
          <div className={`fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${showNotification ? 'opacity-100' : 'opacity-0'}`}>
            {notification}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Now Playing Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {nowPlaying.map(movie => (
            <MovieCard key={movie.id} movie={movie} onAddToFavorites={handleAddToFavorites} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {popularMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onAddToFavorites={handleAddToFavorites} />
          ))}
        </div>
        
        <button 
          onClick={loadMoreMovies} 
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition"
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default HomePage;
