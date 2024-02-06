import React, { useState, useEffect } from "react";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmViMmVlNzk2N2ExM2Y3NDJmOThmYmQ1NDgyOTJhMCIsInN1YiI6IjY1YjlkNzJiMzM0NGM2MDEzMTkyMzc1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2p9hoFolMpqh95uUlUkfd9n3P_Chde1SgJJasxXgWus'
    },
    };

    if (search.length === 0) {
    fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    options
        )
    .then(response => response.json())
    .then(response => setMovies(response.results))
    .catch(err => console.error(err));
    return; 
    } else {
    fetch(
        `https://api.themoviedb.org/3/search/movie?language=en-US&query=${search}&page=1&include_adult=false`, 
    options
        )
        .then(response => response.json())
        .then(response => setMovies(response.results))
        .catch(err => console.error(err));
    }

}, [search]);

    return (
        <div>
            <div className="header">
                <h1 className="title">Movies Katalog</h1>
                <input type="text" 
                placeholder="Search for a movie"
                className="search"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="container">
                {movies.map((movie) => ( 
                    <div className="card" key={movie.id}>
                        <div className="card-content">
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="img" className="card-img" 
                        />
                            <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-release">
                            Release Date: {movie.release_date}
                            </p>
                            <p className="movie-rating">
                            Rating: {movie.vote_average} / 10
                            </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;