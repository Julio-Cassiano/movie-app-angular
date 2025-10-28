export type UserModel = {
    id: string,
    name: string,
    username: string,
    email: string,
    birthDate: string
}

export type CreateOrEditUser = {
    id: string,
    name: string,
    username: string,
    email: string,
    birthDate: string,
    password: string
}