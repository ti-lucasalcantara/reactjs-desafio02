import { useState, useEffect } from 'react';
import { api } from '../services/api';

import { MovieCard } from '../components/MovieCard';
interface Movies {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface Genres {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps{
  selectedGenre: Genres
}

export function Content( { selectedGenre }: ContentProps ) {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    api.get<Movies[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre]);

  return ( 
    <div className="container">
      <header>
        <span className="category">Categoria:<span>{selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}