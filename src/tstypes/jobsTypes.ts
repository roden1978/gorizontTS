export type JobType = {
    _id: string
    company: string
    title: string
    description: string
    price: string
    email: string
    phone: string
    status: boolean
    createAt: string
}

export type JobCreateType = {
    company: string
    title: string
    description: string
    price: string
    email: string
    phone: string
    status: boolean
}