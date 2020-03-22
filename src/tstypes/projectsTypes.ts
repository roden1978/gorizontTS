export type ProjectsType = {
    _id: string
    title: string
    description: string
    text: string
    albumId: string | null
    albumName: string | null
    status: boolean
    createAt?: string
}