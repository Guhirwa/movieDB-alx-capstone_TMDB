# MovieDB - Movie Database Application

![MovieDB Banner](https://via.placeholder.com/1200x300/2563eb/ffffff?text=MovieDB+-+Discover+Your+Next+Favorite+Movie)

## 🎬 Project Overview

MovieDB is a modern, responsive web application that allows users to discover, search, and explore movies using The Movie Database (TMDB) API. Built with React, Vite, and Tailwind CSS, this application provides a seamless experience for movie enthusiasts.

**Live Demo:** [Coming Soon]  
**Author:** Christian GUHIRWA  
**Repository:** [movieDB-alx-capstone_TMDB](https://github.com/Guhirwa/movieDB-alx-capstone_TMDB)

## ✨ Features

### Core Features
- 🔍 **Movie Search** - Search for movies by title, actor, or genre
- 🎥 **Movie Details** - View comprehensive information including cast, ratings, trailers
- ⭐ **Trending Movies** - Discover what's trending weekly
- 🏆 **Top Rated** - Explore critically acclaimed films
- 🎬 **Now Playing** - See what's currently in theaters
- 📋 **Watchlist** - Save movies to watch later (persisted in localStorage)

### Advanced Features
- 🌓 **Dark/Light Mode** - Toggle between themes with persistence
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎞️ **Watch Trailers** - View movie trailers directly in the app
- 🔖 **Genre Filtering** - Filter movies by genre
- 📄 **Pagination** - Navigate through search results efficiently
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations

## 🚀 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **API:** TMDB (The Movie Database) API
- **State Management:** React Context API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free - see setup instructions below)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Guhirwa/movieDB-alx-capstone_TMDB.git
cd movieDB-alx-capstone_TMDB
cd "Phase III"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your TMDB API Key

1. Go to [TMDB Website](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API Key (choose "Developer" option)
5. Fill out the form (you can use any website URL for learning purposes)
6. Copy your API Key

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🌐 Deployment

This project can be deployed on:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add `VITE_TMDB_API_KEY` in Environment Variables
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://netlify.com)
3. Or use Netlify CLI for continuous deployment

## 📁 Project Structure

```
Phase III/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── MovieCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── contexts/          # React Context providers
│   │   ├── ThemeContext.jsx
│   │   └── WatchlistContext.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Search.jsx
│   │   └── Watchlist.jsx
│   ├── services/          # API services
│   │   └── tmdbApi.js
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Components

### Pages
- **Home** - Landing page with trending, top rated, and now playing sections
- **Search** - Search and filter movies with pagination
- **MovieDetails** - Detailed view with cast, trailers, and similar movies
- **Watchlist** - User's saved movies

### Contexts
- **ThemeContext** - Manages dark/light theme state
- **WatchlistContext** - Manages watchlist state with localStorage persistence

### Services
- **tmdbApi.js** - Centralized API service with all TMDB endpoints

## 🔑 API Endpoints Used

- `/trending/movie/{time_window}` - Get trending movies
- `/movie/popular` - Get popular movies
- `/movie/top_rated` - Get top rated movies
- `/movie/now_playing` - Get now playing movies
- `/movie/{id}` - Get movie details
- `/search/movie` - Search movies
- `/discover/movie` - Discover movies with filters
- `/genre/movie/list` - Get movie genres

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#2563eb', // Blue
      },
      secondary: {
        DEFAULT: '#7c3aed', // Purple
      },
    },
  },
}
```

## 🐛 Known Issues & Limitations

- TMDB API has a rate limit (check TMDB documentation)
- Some older movies may not have trailers available
- Pagination is limited to 500 pages by TMDB API

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is part of the ALX Frontend Engineering Capstone Project.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the free API
- [ALX Africa](https://www.alxafrica.com/) for the capstone project opportunity
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) teams
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

**Christian GUHIRWA**
- GitHub: [@Guhirwa](https://github.com/Guhirwa)
- Repository: [movieDB-alx-capstone_TMDB](https://github.com/Guhirwa/movieDB-alx-capstone_TMDB)

---

**Made with ❤️ by Christian GUHIRWA | ALX Frontend Engineering Capstone 2025**
