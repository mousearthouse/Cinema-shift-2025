import { API_URL } from "@/utils/constants";
import { russianRatings } from "@/utils/ageRatings";

export interface FilmCardProps {
    film: Film,
    openFilmPage: () => void;
}

const FilmCard = ({ film, openFilmPage }: FilmCardProps) => (
    <div key={film.id} className="film_container">
      <img src={`${API_URL}api/${film.img}`} alt={film.name} />
      <div className="film_card">
        <h3>{film.name} ({russianRatings[film.ageRating]})</h3>
        <div className="film_card_information">
          <span>Kinopoisk - {film.userRatings.kinopoisk}</span>
          <p>Фильм</p>
        </div>
        <button className="animated-button" onClick={() => openFilmPage()}>
          <span>Подробнее</span>
          <span></span>
        </button>
      </div>
    </div>
  );
  
  export default FilmCard;