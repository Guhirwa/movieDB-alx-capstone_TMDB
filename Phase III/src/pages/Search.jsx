import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieApi } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState([]);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const selectedGenre = searchParams.get('genre') || '';

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieApi.getGenres();
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let response;

        if (query) {
          response = await movieApi.search(query, page);
        } else if (category) {
          switch (category) {
            case 'trending':
              response = await movieApi.getTrending('week');
              break;
            case 'top-rated':
              response = await movieApi.getTopRated(page);
              break;
            case 'now-playing':
              response = await movieApi.getNowPlaying(page);
              break;
            case 'upcoming':
              response = await movieApi.getUpcoming(page);
              break;
            default:
              response = await movieApi.getPopular(page);
          }
        } else if (selectedGenre) {
          response = await movieApi.discover({
            page,
            with_genres: selectedGenre,
          });
        } else {
          response = await movieApi.getPopular(page);
        }

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, category, selectedGenre, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get('search');
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      setPage(1);
    }
  };

  const handleGenreChange = (genreId) => {
    if (genreId) {
      setSearchParams({ genre: genreId });
    } else {
      setSearchParams({});
    }
    setPage(1);
  };

  return (
    <div>
      {/* Search Header */}
      <section className="bg-gray-50 dark:bg-gray-800 py-8 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl p-3 mb-4">
            <span className="text-2xl mr-3 text-gray-400">🔍</span>
            <input
              type="text"
              name="search"
              defaultValue={query}
              placeholder="Search for movies..."
              className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setSearchParams({});
                  setPage(1);
                }}
                className="mr-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </form>
          
          {query && (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Showing results for "<strong>{query}</strong>"
            </p>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-gray-900 py-4 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center">
          <select
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchParams({});
              setPage(1);
            }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : movies.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🎬</span>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              No movies found
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  ← Previous
                </button>
                
                <span className="text-gray-700 dark:text-gray-300">
                  Page {page} of {Math.min(totalPages, 500)}
                </span>
                
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || page >= 500}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
