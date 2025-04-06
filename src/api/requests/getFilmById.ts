import { instance } from "@/api/instance";

interface FilmApiProps {
    onDataLoaded?: (data: Film) => void;
}

export interface ApiResponse {
    film: Film;
}

const getFilmById = async (filmId: number, { onDataLoaded }: FilmApiProps) => {
    const response = await instance.get<ApiResponse>(`/api/cinema/film/${filmId}`);
    if (onDataLoaded) {
        onDataLoaded(response.data.film);
    }
}

export default getFilmById