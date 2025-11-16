export type UserModel = {
    id: string,
    name: string,
    username: string,
    email: string,
    birthDate: string
}

export type CreatingOrEditingUser = {
    name: string,
    username: string,
    email: string,
    birthDate: string,
    password: string
}