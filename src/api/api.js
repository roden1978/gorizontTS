//import * as axios from "axios/index"

import axios from 'axios'
//import auth0 from 'auth0-js'

//import {connect} from "react-redux"
//import {getAuthorize} from "../redux/actions/authActions"

const instance = axios.create()
/*let auth = new auth0.WebAuth({
    domain: 'dev-8e4ti4s2.auth0.com',
    clientID: 'bOS225UZ986RtJmRgZCZG2SzZPGPJGJZ',
    redirectUri: 'http://localhost:3000/login',
    responseType: 'token id_token',
    scope: 'email'
})*/
//API для новостей
export const mongodbAPI = {
    //Получить новости с условием
    getNews() {
        //debugger
        return instance.get('/api/news/')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить все новости
    getAllNews() {
        //debugger
        return instance.get('/api/news/all')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить новости с ИД
    getNewsItem(id) {
        return instance.get('/api/news/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить новость
    updateNews(newsData) {
        return instance.post('/api/news/upd', newsData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать новость
    createNews(newsData) {
        return instance.post('/api/news/', newsData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Удалить новость из БД
    deleteNews(newsData) {
        return instance.delete('/api/news/' + newsData.id)
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
        return instance.get('/api/projects')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Получить проект с ИД
    getProject(id) {
        return instance.get('/api/projects/' + id)
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
        return instance.get('/api/projects/all')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить проект
    updateProject(projectData) {
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
    createProject(projectData) {
        return instance.post('/api/projects/', projectData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Удалить проект из БД
    deleteProject(projectData) {
        return instance.delete('/api/projects/' + projectData.id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //API для объявлений
    getJobs() {
        //debugger
        return instance.get('/api/job')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить все объявления
    getAllJobs() {
        //debugger
        return instance.get('/api/job/all')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить объявление с ИД
    getJobsItem(id) {
        return instance.get('/api/job/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить объявление
    updateJob(jobData) {
        return instance.post('/api/job/upd', jobData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать объявление
    createJob(jobData) {
        return instance.post('/api/job/', jobData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Удалить объявление из БД
    deleteJob(jobData) {
        return instance.delete('/api/job/' + jobData.id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //API для контактов
    getContacts() {
        //debugger
        return instance.get('/api/contacts')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать контакты
    createContacts(contactsData) {
        return instance.post('/api/contacts/', contactsData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить контакты
    updateContacts(contactsData) {
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
        //debugger
        return instance.get('/api/about')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Создать о нас
    createAbout(aboutData) {
        //debugger
        return instance.post('/api/about/', aboutData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Обновить инфу о нас
    updateAbout(aboutData) {
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
        //debugger
        return instance.get('/api/users/')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },

//Получить пользователя с ИД
    getUser(id) {
        return instance.get('/api/users/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Обновить пользователя
    updateUser(userData) {
        return instance.post('/api/users/upd', userData)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Создать пользователя
    createUser(userData) {
        return instance.post('/api/users/', userData)
            .then(response => {
                console.log(response.data.err)
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
//Удалить пользователя из БД
    deleteUser(userData) {
        return instance.delete('/api/users/' + userData.id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    getAdminRootCount(){
        return instance.get('/api/users/count')
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    checkUser(userData) {
        //debugger
        return instance.post('/api/users/login', userData)
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
        return instance.get('/api/albums')
            .then(response => {
                return response.data.photosets.photoset //массив фотоальбомов
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить список фотографий из альбома с ID
    getPhotos(id/*Id PhotoAlbum*/) {
        return instance.get('/api/photos/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    },
    //Получить объект со ссылками на фото по ID с разными размерами фото
    getPhoto(id/*Id Photo*/) {
        return instance.get('/api/photos/photo/' + id)
            .then(response => {
                return response.data
            })
            .catch(err =>
                console.log(err)
            )
    }
}