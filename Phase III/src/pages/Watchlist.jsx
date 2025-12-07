import { Link } from 'react-router-dom';
import { useWatchlist } from '../contexts/WatchlistContext';
import { imageUrl } from '../services/tmdbApi';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">📭</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your watchlist is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start adding movies you want to watch later!
        </p>
        <Link to="/search" className="btn-primary">
          Discover Movies
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">📋 My Watchlist</h1>
          <p className="text-lg">
            You have <strong>{watchlist.length}</strong> {watchlist.length === 1 ? 'movie' : 'movies'} saved
          </p>
        </div>
      </section>

      {/* Watchlist Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {watchlist.map(movie => (
            <div
              key={movie.id}
              className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Poster */}
              <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                <img
                  src={movie.poster_path ? imageUrl.w300(movie.poster_path) : '/placeholder-movie.jpg'}
                  alt={movie.title}
                  className="w-full sm:w-40 h-48 sm:h-auto object-cover"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 p-4 flex flex-col">
                <Link to={`/movie/${movie.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary transition mb-2">
                    {movie.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {movie.vote_average > 0 && (
                    <span className="font-semibold">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                  {movie.release_date && (
                    <span>
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition font-medium"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Watchlist;
