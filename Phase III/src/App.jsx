import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WatchlistProvider } from './contexts/WatchlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;
