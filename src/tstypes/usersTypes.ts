export type UsersType = {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    root: boolean
}

export type UsersCreateType = {
    firstName: string
    lastName: string
    email: string
    password: string
    root: boolean
}

export type CheckUserType = {
    email: string
    password: string
}