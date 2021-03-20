import { useState, useEffect } from 'react';

import { api } from '../services/api';

import { Button } from '../components/Button';

interface Genres {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps{
  handleClickButton: (id: number) => void
}

export function SideBar( {handleClickButton} : SideBarProps) {
  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    api.get<Genres[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []); 

  return ( 
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={false}
          />
        ))}
      </div>
    </nav>
  );
}