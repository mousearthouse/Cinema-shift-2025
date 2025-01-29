const enum Ratings {
    G = 'G',
    PG = 'PG',
    R = 'R',
    NC17 = 'NC17'
}

export const russianRatings: { [key: string]: string } = {
    [Ratings.G]: '6+',
    [Ratings.PG]: '12+',
    [Ratings.R]: '16+',
    [Ratings.NC17]: '18+'
}