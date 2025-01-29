interface profession {
    ACTOR,
    DIRECTOR,
}

interface rating {
    G,
    PG,
    PG13,
    R,
    NC17,
}

interface FilmStaff {
    id: string,
    professions: profession,
    fullName: string,
}

interface Film {
    id: string,
    name: string,
    originalName: string,
    description: string,
    releaseDate: string,
    actors: FilmStaff[],
    directors: FilmStaff[],
    runtime: number,
    ageRating: string,
    userRatings: {
        kinopoisk: string,
        imdb: string,
    },
    img: string,
    country?: {
        name: string,
        code: string,
        code2: string,
        id: number,
    }
}