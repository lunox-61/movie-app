import axios from 'axios';
import { Movie } from '../types/Movie';

const API_KEY = 'fd76fbc2c1c1ebac3758c266052378fd'; // Ganti dengan API key Anda
const BASE_URL = 'https://api.themoviedb.org/3';

// Fungsi untuk mendapatkan film populer
export const getPopularMovies = async (page: number = 1): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
            page: page
        }
    });
    return response.data.results; // Kembalikan array film
};  

// Fungsi untuk mendapatkan detail film berdasarkan ID
export const getMovieDetails = async (movieId: number): Promise<Movie> => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data; // Pastikan struktur data sesuai dengan interface Movie
};

// Fungsi untuk mendapatkan film yang sedang tayang
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data.results; // Kembalikan array film
};
