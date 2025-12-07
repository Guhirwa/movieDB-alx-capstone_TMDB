const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-3xl">🎬</span>
              <span className="text-2xl font-bold text-primary">MovieDB</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your ultimate destination for discovering movies, building watchlists, and exploring the world of cinema.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/search?category=trending" className="hover:text-primary transition">Trending</a></li>
              <li><a href="/search?category=top-rated" className="hover:text-primary transition">Top Rated</a></li>
              <li><a href="/search?category=upcoming" className="hover:text-primary transition">Upcoming</a></li>
              <li><a href="/search?category=now-playing" className="hover:text-primary transition">Now Playing</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Account</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/watchlist" className="hover:text-primary transition">My Watchlist</a></li>
              <li><a href="#" className="hover:text-primary transition">Settings</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">About</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 MovieDB. Made with ❤️ by Christian GUHIRWA. Data provided by TMDB.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
