import {applyMiddleware, compose, combineReducers, createStore} from "redux"
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
//Reducers
import news_reducer from './reducers/newsReducer'
import projects_reducer from './reducers/projectsReducer'
import photos_reducer from "./reducers/photosReducer"
import jobs_reducer from "./reducers/jobsReducer"
import contacts_reducer from "./reducers/contactsReducer"
import about_reducer from "./reducers/aboutReducer"
import auth_reducer from "./reducers/authReducer"
import users_reducer from "./reducers/usersReducer"

let rootReducer = combineReducers({
    news: news_reducer,
    projects: projects_reducer,
    photos: photos_reducer,
    jobs: jobs_reducer,
    contacts: contacts_reducer,
    about: about_reducer,
    auth: auth_reducer,
    users: users_reducer,
    form: formReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
type Properties<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<Properties<T>>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store