


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const API_KEY = 'c51582bc247b9288683129a9b44e899e';
  const TMDB_API_URL = 'https://api.themoviedb.org/3/discover/movie?';

  const handleSearch = async () => 
  { 

    try {
    const response = await axios.get(TMDB_API_URL, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });

    if (query.length === 0) {
   
    alert('no movies found')
    } else {
   
      setMovies(response.data.results);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    
    alert('an error occured while fetching data')

  }
  };


useEffect(()=>{
    const getMovies = () =>{
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=c51582bc247b9288683129a9b44e899e")
        .then(res=>res.data())
        .then(data =>setMovies(data.results))
    }
},[])


  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const renderMovieDetails = () => {
    if (selectedMovie) {
      return (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>Overview: {selectedMovie.overview}</p>
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>Rating: {selectedMovie.vote_average}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <input
        type="text"
        placeholder="Enter a movie title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="movie-details">{renderMovieDetails()}</div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie"
            onClick={() => handleMovieClick(movie)}
            style={{flexDirection:'row'}}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{width:"200px",height:"350px"}}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default Movies;
