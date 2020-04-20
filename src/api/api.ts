import axios from 'axios'
import {NewsCreateType, NewsType} from "../tstypes/newsTypes";
import {ProjectCreateType, ProjectsType} from "../tstypes/projectsTypes";
import {JobCreateType, JobType} from "../tstypes/jobsTypes";
import {ContactsCreateType, ContactsType} from "../tstypes/contactsTypes";
import {AboutCreateType, AboutType} from "../tstypes/aboutTypes";
import {CheckUserType, UsersCreateType, UsersType} from "../tstypes/usersTypes";
import {AlbumsType, PhotosetType, PhotoSizesType} from "../tstypes/photosTypes";

const instance = axios.create()

//API для новостей
export const mongodbAPI = {
    //Получить новости с условием
    getNews() {
        return instance.get<Array<NewsType>>('/api/news/')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить все новости
    getAllNews(currentPage: number, pageSize:number) {
        return instance.get<Array<NewsType>>('/api/news/all?page=' + currentPage + '&size=' + pageSize)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить новости с ИД
    getNewsItem(/*ИД_Новости*/id: string) {
        return instance.get<NewsType>('/api/news/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить новость
    updateNews(/*Объект_с_измененными_данными_новости*/newsData: NewsType) {
        //debugger
        return instance.post('/api/news/upd', newsData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать новость
    createNews(/*Объект_с_новыми_данными_новости*/newsCreateData: NewsCreateType) {
        return instance.post('/api/news/', newsCreateData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Удалить новость из БД

    deleteNews(/*Объект_с_ИД_новости_для_удаления*/_id: string) {
        return instance.delete('/api/news/' + _id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить количество новостей
    getNewsCount(){
        return instance.get<number>('/api/news/get/count')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//API для проектов
    //Полусть проекты с условием
    getProjects() {
        return instance.get<Array<ProjectsType>>('/api/projects')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Получить проект с ИД
    getProject(/*ИД_проекта*/id: string) {
        return instance.get<ProjectsType>('/api/projects/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить все проекты
    getAllProjects() {
        //debugger
        return instance.get<Array<ProjectsType>>('/api/projects/all')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить проект
    updateProject(/*Объект_с_измененными_данными_проекта*/projectData: ProjectsType) {
        //debugger
        return instance.post('/api/projects/upd', projectData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать проект
    createProject(/*Объект_с_новыми_данными_проекта*/projectCreateData: ProjectCreateType) {
        return instance.post('/api/projects/', projectCreateData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Удалить проект из БД
    deleteProject(/*Объект_с_ИД_новости_для_удаления*/_id: string) {
        return instance.delete('/api/projects/' + _id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //API для объявлений
    getJobs() {
        return instance.get<Array<JobType>>('/api/job')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить все объявления
    getAllJobs() {
        return instance.get<Array<JobType>>('/api/job/all')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить объявление с ИД
    getJobsItem(/*ИД_объявления*/id: string) {
        return instance.get<JobType>('/api/job/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить объявление
    updateJob(/*Объект_с_измененными_данными_объявления*/jobData: JobType) {
        return instance.post('/api/job/upd', jobData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать объявление
    createJob(/*Объект_с_новыми_данными_объявления*/jobCreateData: JobCreateType) {
        return instance.post('/api/job/', jobCreateData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Удалить объявление из БД
    deleteJob(/*Объект_с_ИД_для_удаления_объявления*/_id: string) {
        return instance.delete('/api/job/' + _id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //API для контактов
    getContacts() {
        return instance.get<Array<ContactsType>>('/api/contacts')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать контакты
    createContacts(/*Объект_с_новыми_данными_контактов*/contactsCreateData: ContactsCreateType) {
        return instance.post('/api/contacts/', contactsCreateData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить контакты
    updateContacts(/*Объект_с_измененными_данными_контактов*/contactsData: ContactsType) {
        return instance.post('/api/contacts/upd', contactsData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //API для о нас
    getAbout() {
        return instance.get<Array<AboutType>>('/api/about')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать о нас
    createAbout(/*Объект_с_новыми_данными_о_компании*/aboutCreateData: AboutCreateType) {
        return instance.post('/api/about/', aboutCreateData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить инфу о нас
    updateAbout(/*Объект_с_измененными_данными_о_компании*/aboutData: AboutType) {
        return instance.post('/api/about/upd', aboutData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },

    //Получить пользователей
    getUsers() {
        return instance.get<Array<UsersType>>('/api/users/')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },

//Получить пользователя с ИД
   /* getUser(id) {
        return instance.get('/api/users/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },*/
//Обновить пользователя
    updateUser(/*Объект_с_измененными_данными_пользователя*/userData: UsersType) {
        return instance.post('/api/users/upd', userData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Создать пользователя
    createUser(/*Объект_с_новыми_данными_пользователя*/userCreateData: UsersCreateType) {
        return instance.post('/api/users/', userCreateData)
            .then(response => {
                console.log(response.data.err)
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Удалить пользователя из БД
    deleteUser(/*Объект_с_ИД_для_удаления_пользователя*/_id: string) {
        return instance.delete('/api/users/' + _id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    getAdminRootCount(){
        return instance.get<number>('/api/users/count')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    checkUser(/*Объект_с_данными_для_проверки_пользователя*/checkUserData: CheckUserType) {
        return instance.post<UsersType>('/api/users/login', checkUserData)
            .then(response => {
                if (response.data) {
                    return response.data
                }
                else{
                    return false
                }
            })
            .catch(err =>
                console.log(err)
            )
    }
}

export const flickrAPI = {
    //Получить список альбомов
    getAlbums() {
        //debugger
        return instance.get<AlbumsType>('/api/albums')
            .then(response => {
                return response.data //массив фотоальбомов
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить список фотографий из альбома с ID
    getPhotos(/*ИД_Фотоальбома*/id: string) {
        return instance.get<PhotosetType>('/api/photos/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить объект со ссылками на фото по ID с разными размерами фото
    getPhoto(/*ИД_Фотографии*/id: string) {
        return instance.get<PhotoSizesType>('/api/photos/photo/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    }
}