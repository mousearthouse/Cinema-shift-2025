import { useCallback, useEffect, useState } from 'react';
import './mainPage.scss';
import { getCinemaCatalog } from '@/api/imports';
import FilmCard from './FilmCard';
import Header from '@/components/Header/Header';

const MainPage = () => {
    
    const [filmData, setFilmData] = useState<Film[]>([]);

    const handleDataLoading = useCallback((data: Film[]) => {
        setFilmData(data);
    }, []);

    const openFilmPage = (film: Film) => {
        console.log("тут будет перекидывание на страницу фильма");
    }

    useEffect(() => {
        getCinemaCatalog({ onDataLoaded: handleDataLoading });
    }, [handleDataLoading]);

    console.log(filmData);
    
    return (
        <main>
            <Header />
            <div className='name'>
                Афиша
            </div>
            <div className='container_films'>
                {filmData.map((film) => (
                    <FilmCard film={film} openFilmPage={() => openFilmPage(film)} key={film.id} />
                ))}
            </div>
        </main>
    )
}

export default MainPage;