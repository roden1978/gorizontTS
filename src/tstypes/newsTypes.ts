export type NewsType = {
    _id: string
    title: string
    text: string
    project: string | null
    projectTitle: string | null
    status: boolean
    createAt?: string
}