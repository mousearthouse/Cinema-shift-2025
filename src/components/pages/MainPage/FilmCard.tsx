import { API_URL } from "@/utils/constants";
import { russianRatings } from "@/utils/ageRatings";
import { useNavigate } from "react-router-dom";
import '@/components/pages/MainPage/mainPage.scss';

export interface FilmCardProps {
    film: Film
}

const FilmCard = ({ film}: FilmCardProps) => {

  const navigate = useNavigate();
  const openFilmPage = () => {
    navigate(`film/${film.id}`);
  };

  return (    
      <div className="film_card">
        <div className="card-img-container">
          <img src={`${API_URL}api/${film.img}`} alt={film.name} />
          <div><b>{film.genres[0]}</b><p>{film?.country?.name ?? ''}, {film.releaseDate.split(' ')[2]}</p></div>
        </div>
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
)

};
  
export default FilmCard;