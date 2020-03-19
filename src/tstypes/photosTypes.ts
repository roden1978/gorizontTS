export type PhotoType = {
    id: string
    secret: string
    server: string
    farm: number
    title: string
    isprimary: string
    ispublic: number
    isfriend: number
    isfamily: number
    url?: string
    albumId?: string
}
export type PhotoSizesType = {
    label: string
    width: number
    height: number
    source: string
    url: string
    media: string
}
export type TitleType = {
    _content: string
}
export type DescriptionType = {
    _content: string
}
export type PhotosetType= {
    id: string
    owner: string
    username: string
    primary: string
    secret: string
    server: string
    farm: number
    count_views: string
    count_comments: string
    count_photos: number
    count_videos: number
    title: TitleType
    description: DescriptionType
    can_comment: number
    date_create: string
    date_update: string
    photos: number
    videos: number
    visibility_can_see_set: number
    needs_interstitial: number
    url?: string
}