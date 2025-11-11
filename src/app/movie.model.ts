export type MovieModel = {
    id: number,
    name: string,
    synopsis: string,
    releaseDate: string,
    durationInSeconds: number,
    imagePath: string,
    username: string,
    directorNames: string[]
}

export type CreatingMovie = {
    name: string,
    synopsis: string,
    releaseDate: string,
    durationInSeconds: number,
    imagePath: string,
    username: string,
    directorNames: string[]
}