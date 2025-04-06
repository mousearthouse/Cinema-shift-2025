import './filmPage.scss';
import { useParams, useNavigate } from "react-router-dom";
import getFilmById from "@/api/requests/getFilmById";
import getFilmSchedule from "@/api/requests/getFilmSchedule";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/utils/constants";

const FilmPage = () => {
    const navigate = useNavigate();
    const { filmId } = useParams();
    
    const [film, setFilm] = useState<Film | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [seances, setSeances] = useState<Seances[]>([]);
    const [remappedSeances, setRemappedSeances] = useState<Record<string, FilmSeance[]>>({});
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedHall, setSelectedHall] = useState<string>('');
    
    const isContinueActive = selectedDate !== '' && selectedTime !== '';

    const handleFilmDataLoading = useCallback((film: Film) => {
        setFilm(film);
        setIsLoading(false);
    }, []);

    const handleScheduleLoading = useCallback((seances: Seances[]) => {
        setSeances(seances);
    }, []);

    useEffect(() => {
        if (filmId) {
            getFilmById(Number(filmId), { onDataLoaded: handleFilmDataLoading });
            getFilmSchedule(Number(filmId), { onDataLoaded: handleScheduleLoading });
        }
    }, [handleFilmDataLoading, handleScheduleLoading]);

    useEffect(() => {
        const mappedSeances: Record<string, FilmSeance[]> = {};
        seances.forEach(seanceDay => {
            seanceDay.seances.forEach(seance => {
                seance.date = seanceDay.date;
                const hallName = seance.hall.name;
                if (!mappedSeances[hallName]) {
                    mappedSeances[hallName] = [];
                }
                mappedSeances[hallName].push(seance);
            });
        });
        setRemappedSeances(mappedSeances);
    }, [seances]);

    const openFilmPage = (selectedDate: string, selectedHall: string, selectedTime: string) => {
        navigate(`?date=${selectedDate}&hall=${selectedHall}&time=${selectedTime}`);
    };

    if (isLoading) return <Loading />;
    if (!film) return <NotFound />;

    return (
        <main>
            <div className='content'>
                <FilmDetails film={film} />
                <Schedule 
                    seances={seances} 
                    remappedSeances={remappedSeances} 
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate} 
                    selectedTime={selectedTime} 
                    setSelectedTime={setSelectedTime} 
                    selectedHall={selectedHall} 
                    setSelectedHall={setSelectedHall} 
                    isContinueActive={isContinueActive} 
                    openFilmPage={openFilmPage} 
                />
            </div>
        </main>
    );
};

const Loading = () => (
    <main>
        <h2>Загрузка...</h2>
    </main>
);

const NotFound = () => (
    <main>
        <h2>Фильм не найден :(</h2>
    </main>
);

const FilmDetails = ({ film }: { film: Film }) => (
    <div key={film.id} className="film_content">
        <div className="img-container">
          <img src={`${API_URL}api/${film.img}`} alt={film.name} />
          <div><b>{film.genres[0]}</b><p>{film?.country?.name ?? ''}, {film.releaseDate.split(' ')[2]}</p></div>
        </div> 
        <div className='film_description'>
            <div className='name'>{film.name}</div>     
            <p>Фильм</p>  
            <p>Kinopoisk - {film.userRatings.kinopoisk}</p>  
            <p>{film.description}</p>                   
        </div>         
    </div>
);

const Schedule = ({ 
    seances, remappedSeances, selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedHall, setSelectedHall, isContinueActive, openFilmPage 
}: {
    seances: Seances[];
    remappedSeances: Record<string, FilmSeance[]>;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedTime: string;
    setSelectedTime: (time: string) => void;
    selectedHall: string;
    setSelectedHall: (hall: string) => void;
    isContinueActive: boolean;
    openFilmPage: (date: string, hall: string, time: string) => void;
}) => (
    <div className="schedule-container">
        <h3>Расписание</h3>
        <div className="date-picker">
            {seances.map((item) => (
                <button
                    key={item.date}
                    className={`date-button ${selectedDate === item.date ? "active" : ""}`}
                    onClick={() => {
                        setSelectedDate(item.date);
                        setSelectedTime('');
                    }}
                >
                    {item.date}
                </button>
            ))}
        </div>
        <Sessions remappedSeances={remappedSeances} selectedDate={selectedDate} setSelectedTime={setSelectedTime} setSelectedHall={setSelectedHall} />
        <button className="continue-button" disabled={!isContinueActive} onClick={() => openFilmPage(selectedDate, selectedHall, selectedTime)}>
            Продолжить
        </button>
    </div>
);

const Sessions = ({ remappedSeances, selectedDate, setSelectedTime, setSelectedHall }: {
    remappedSeances: Record<string, FilmSeance[]>;
    selectedDate: string;
    setSelectedTime: (time: string) => void;
    setSelectedHall: (hall: string) => void;
}) => (
    <div className="sessions">
        {Object.entries(remappedSeances).map(([hallName, seances]) => (
            <div className={hallName} key={hallName}>
                <h3>{hallName}</h3>
                <div className="seances-time">
                    {seances.map((seance, index) =>
                        seance.date === selectedDate ? (
                            <div 
                                className="time-container"
                                onClick={() => {
                                    setSelectedTime(seance.time);
                                    setSelectedHall(hallName);
                                }}
                                key={index}
                            >
                                {seance.time}
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        ))}
    </div>
);

export default FilmPage;
