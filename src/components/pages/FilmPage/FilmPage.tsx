import './filmPage.scss'
import { useParams } from "react-router-dom";
import getFilmById from "@/api/requests/getFilmById";
import { useState, useEffect, useCallback } from "react";

const FilmPage = () => {

    const { filmId } = useParams();
    const [film, setFilm] = useState<Film | null >(null);

    const handleDataLoading = useCallback((film: Film) => {
            setFilm(film);
        }, []);

    useEffect(() => {
        if (filmId) {
            getFilmById(Number(filmId), { onDataLoaded: handleDataLoading })
        }
    }, [handleDataLoading]);


    console.log(film);
    return (
        <main>
            <div>
                вааау я чето сделала ураа рар
            </div>
        </main>
    )
}

export default FilmPage;