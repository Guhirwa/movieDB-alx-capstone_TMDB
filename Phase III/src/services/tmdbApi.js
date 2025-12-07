import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const imageUrl = {
  original: (path) => `${IMAGE_BASE_URL}/original${path}`,
  w500: (path) => `${IMAGE_BASE_URL}/w500${path}`,
  w300: (path) => `${IMAGE_BASE_URL}/w300${path}`,
  w200: (path) => `${IMAGE_BASE_URL}/w200${path}`,
};

// Movie endpoints
export const movieApi = {
  // Get trending movies
  getTrending: (timeWindow = 'day') => 
    tmdbApi.get(`/trending/movie/${timeWindow}`),
  
  // Get popular movies
  getPopular: (page = 1) => 
    tmdbApi.get('/movie/popular', { params: { page } }),
  
  // Get top rated movies
  getTopRated: (page = 1) => 
    tmdbApi.get('/movie/top_rated', { params: { page } }),
  
  // Get now playing movies
  getNowPlaying: (page = 1) => 
    tmdbApi.get('/movie/now_playing', { params: { page } }),
  
  // Get upcoming movies
  getUpcoming: (page = 1) => 
    tmdbApi.get('/movie/upcoming', { params: { page } }),
  
  // Get movie details
  getDetails: (id) => 
    tmdbApi.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar,reviews',
      },
    }),
  
  // Search movies
  search: (query, page = 1) => 
    tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
      },
    }),
  
  // Discover movies with filters
  discover: (params = {}) => 
    tmdbApi.get('/discover/movie', { params }),
  
  // Get movie genres
  getGenres: () => 
    tmdbApi.get('/genre/movie/list'),
};

export default tmdbApi;
