import { useCallback, useEffect, useState } from 'react';
import './mainPage.scss';
import { getCinemaCatalog } from '@/api/imports';
import FilmCard from './FilmCard';

const MainPage = () => {
    
    const [filmData, setFilmData] = useState<Film[]>([]);

    const handleDataLoading = useCallback((data: Film[]) => {
        setFilmData(data);
    }, []);

    useEffect(() => {
        getCinemaCatalog({ onDataLoaded: handleDataLoading });
    }, [handleDataLoading]);

    console.log(filmData);
    
    return (
        <main>
            <div className='name'>
                Афиша
            </div>
            <div className='container_films'>
                {filmData.map((film) => (
                    <FilmCard film={film} key={film.id}/>
                ))}
            </div>
        </main>
    )
}

export default MainPage;