//Тип описывающий фотографию
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
//Тип описывающий размер фотографии
export type SizeType = {
    label: string
    width: number
    height: number
    source: string
    url: string
    media: string
}

export type PhotoSizesType = {
    sizes: SizesType
    stat: string
}

export type SizesType = {
    canblog: number
    canprint: number
    candownload: number
    size: Array<SizeType>
}

export type TitleType = {
    _content: string
}
export type DescriptionType = {
    _content: string
}
export type AlbumsType = {
    photosets: PhotoAlbumsType
    stat: string
}
export type PhotoAlbumsType = {
    page: number
    pages: number
    perpage: number
    total: number
    photoset: Array<PhotoAlbumType>
}
export type PhotoAlbumType = {
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
//url?: string
//Тип описывающий фотоальбом с массивом типов описывающих фотографию
export type PhotosType = {
    id: string
    primary: string
    owner: string
    ownername: string
    photo: Array<PhotoType>
    page: number
    per_page: number
    perpage: number
    pages: number
    title: string
    total: number
}

export type PhotosetType = {
    photoset: PhotosType
    stat: string
}