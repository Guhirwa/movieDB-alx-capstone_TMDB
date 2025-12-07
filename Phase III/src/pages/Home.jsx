import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieApi } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingRes, topRatedRes, nowPlayingRes] = await Promise.all([
          movieApi.getTrending('week'),
          movieApi.getTopRated(),
          movieApi.getNowPlaying(),
        ]);

        setTrending(trendingRes.data.results.slice(0, 6));
        setTopRated(topRatedRes.data.results.slice(0, 6));
        setNowPlaying(nowPlayingRes.data.results.slice(0, 6));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Explore millions of movies, create your watchlist, and find your next binge-worthy film.
          </p>
          
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full p-2 shadow-2xl max-w-2xl mx-auto">
            <span className="text-2xl ml-4 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, actors, genres..."
              className="flex-1 px-4 py-3 text-gray-900 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🔥 Trending Now
            </h2>
            <button
              onClick={() => navigate('/search?category=trending')}
              className="text-primary hover:underline font-semibold"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trending.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ⭐ Top Rated
            </h2>
            <button
              onClick={() => navigate('/search?category=top-rated')}
              className="text-primary hover:underline font-semibold"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topRated.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Now Playing */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎬 Now Playing
            </h2>
            <button
              onClick={() => navigate('/search?category=now-playing')}
              className="text-primary hover:underline font-semibold"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {nowPlaying.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
