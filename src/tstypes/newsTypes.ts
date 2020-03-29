export type NewsType = {
    _id: string
    title: string
    text: string
    project: string
    projectTitle: string
    status: boolean
    createAt: string
}

export type NewsCreateType = {
    title: string
    text: string
    project: string
    projectTitle: string
    status: boolean
}