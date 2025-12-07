import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist(prev => {
      if (!prev.find(m => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(m => m.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};
