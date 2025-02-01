interface FilmSeance {
    time: string,
    date: string?,  // set after remapping
    hall: {
        name: string,
        places: Place[][],
    },
}

interface Place {
    price: string,
    type: string,
}

interface Seances {
    date: string,
    seances: FilmSeance[],
}