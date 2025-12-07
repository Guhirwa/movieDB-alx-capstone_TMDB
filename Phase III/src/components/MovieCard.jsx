import { Link } from 'react-router-dom';
import { imageUrl } from '../services/tmdbApi';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  return (
    <Link 
      to={`/movie/${id}`}
      className="card group cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster_path ? imageUrl.w500(poster_path) : '/placeholder-movie.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {vote_average > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-semibold">
            ⭐ {vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {release_date ? new Date(release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
