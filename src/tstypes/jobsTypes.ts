export type JobType = {
    _id: string
    company: string
    title: string
    description: string
    price: string
    email: string | null
    phone: string
    status: boolean
    createAt?: string
}