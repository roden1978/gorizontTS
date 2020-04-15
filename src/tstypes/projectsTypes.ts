export type ProjectsType = {
    _id: string
    title: string
    description: string
    text: string
    albumId: string
    albumName: string
    status: boolean
    createAt: string
}

export type ProjectCreateType = {
    title: string
    description: string
    text: string
    albumId: string
    albumName: string
    status: boolean
    createAt: string
}