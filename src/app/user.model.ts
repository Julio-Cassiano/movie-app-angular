export type UserModel = {
    id: string,
    name: string,
    username: string,
    email: string,
    birthDate: string
}

export type CreatingUser = {
    id?: string,
    name?: string,
    username?: string,
    email?: string,
    birthDate?: string,
    password?: string
}