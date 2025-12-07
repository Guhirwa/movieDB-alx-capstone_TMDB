import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieApi, imageUrl } from '../services/tmdbApi';
import { useWatchlist } from '../contexts/WatchlistContext';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MovieDetails = () => {
  const { id } = useParams();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getDetails(id);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${imageUrl.original(movie.backdrop_path)})`
            : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster_path ? imageUrl.w500(movie.poster_path) : '/placeholder-movie.jpg'}
              alt={movie.title}
              className="w-64 rounded-xl shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {movie.title}
              <span className="font-normal opacity-70 ml-2">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            </h1>

            <div className="flex items-center gap-4 text-lg mb-4">
              <span className="text-yellow-400 font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>{movie.status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(genre => (
                <span
                  key={genre.id}
                  className="px-4 py-1 bg-white/20 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {movie.tagline && (
              <p className="text-lg italic mb-6 text-white/80">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="btn-primary"
                >
                  ▶ Watch Trailer
                </button>
              )}
              <button
                onClick={handleWatchlistToggle}
                className="btn-secondary"
              >
                {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {movie.overview}
        </p>
      </section>

      {/* Details Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Release Date</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {new Date(movie.release_date).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Budget</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${movie.budget?.toLocaleString() || 'N/A'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${movie.revenue?.toLocaleString() || 'N/A'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Language</p>
            <p className="font-semibold text-gray-900 dark:text-white uppercase">
              {movie.original_language}
            </p>
          </div>
        </div>
      </section>

      {/* Cast */}
      {movie.credits?.cast?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Top Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast.slice(0, 6).map(person => (
              <div key={person.id} className="text-center">
                <img
                  src={person.profile_path ? imageUrl.w200(person.profile_path) : '/placeholder-person.jpg'}
                  alt={person.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-2 shadow-lg"
                />
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  {person.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {person.character}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Movies */}
      {movie.similar?.results?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.similar.results.slice(0, 6).map(similarMovie => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </section>
      )}

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allowFullScreen
                title="Movie Trailer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
