import {mongodbAPI} from '../../api/api'
import {
    CHANGE_JOBS_ITEM,
    IS_ALL_JOBS,
    SET_CURRENT_JOBS_ID,
    SET_DEFAULT_JOB,
    SET_JOB_IS_SHOW_SPINNER,
    SET_JOBS,
    SET_JOBS_COUNT,
    SET_JOBS_CURRENT_PAGE,
    SET_JOBS_ITEM
} from "./types"
import {JobType} from "../../tstypes/jobsTypes"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"

type JobsActionType = SetJobsActionType | SetIsAllJobsActionType | SetChangeJobsItemActionType |
    SetDefaultJobActionType | SetJobsItemActionType | SetCurrentJobsIdActionType |
    SetJobsCountActionType

export type SetJobsActionType = {
    type: typeof SET_JOBS
    payload: Array<JobType>
}
/*Создаем объекты action с обязательным свойством type*/
export const setJobs = (jobs: Array<JobType>): SetJobsActionType => {
    return {
        type: SET_JOBS,
        payload: jobs
    }
}

export type SetIsAllJobsActionType = {
    type: typeof IS_ALL_JOBS
    payload: boolean
}
export const setIsAllJobs = (isAllJobs: boolean): SetIsAllJobsActionType => {
    return {
        type: IS_ALL_JOBS,
        payload: isAllJobs
    }
}

export type SetChangeJobsItemActionType ={
    type: typeof CHANGE_JOBS_ITEM
}
export const setChangeJobsItem = (): SetChangeJobsItemActionType => {
    return {
        type: CHANGE_JOBS_ITEM
    }
}

export type SetDefaultJobActionType = {
    type: typeof SET_DEFAULT_JOB
}
export const setDefaultJob = (): SetDefaultJobActionType => {
    return {
        type: SET_DEFAULT_JOB
    }
}

export type SetJobsItemActionType = {
    type: typeof SET_JOBS_ITEM
    payload: boolean
}
export const setJobsItem = (isSetJobsItem: boolean): SetJobsItemActionType => {
    return {
        type: SET_JOBS_ITEM,
        payload: isSetJobsItem
    }
}

export type SetCurrentJobsIdActionType = {
    type: typeof SET_CURRENT_JOBS_ID
    payload: string
}
export const setCurrentJobsId = (id: string): SetCurrentJobsIdActionType => {
    return {
        type: SET_CURRENT_JOBS_ID,
        payload: id
    }
}

export type SetJobsCountActionType = {
    type: typeof SET_JOBS_COUNT
    payload: number
}
export const setJobsCount = (count: number): SetJobsCountActionType => {
    return {
        type: SET_JOBS_COUNT,
        payload: count
    }
}

export type SetJobsCurrentPage = {
    type: typeof SET_JOBS_CURRENT_PAGE
    payload: number
}
export const setJobsCurrentPage = (currentPage: number): SetJobsCurrentPage =>{
    return {
        type: SET_JOBS_CURRENT_PAGE,
        payload: currentPage
    }
}

export type SetIsShowSpinner = {
    type: typeof SET_JOB_IS_SHOW_SPINNER
    payload: boolean
}

export const setIsShowSpinner = (isShowSpinner: boolean): SetIsShowSpinner =>{
    return {
        type: SET_JOB_IS_SHOW_SPINNER,
        payload: isShowSpinner
    }
}
export type JobsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, JobsActionType>
/*Thunk Creators*/
export const getJobs = (): JobsThunkType => {
    return async (dispatch) => {
        const jobs = await mongodbAPI.getJobs()
        if(jobs)
        dispatch(setJobs(jobs))
    }
}
export const getAllJobs = (currentPage: number, pageSize: number): JobsThunkType => {
    return async (dispatch) => {
        const jobs = await mongodbAPI.getAllJobs(currentPage, pageSize)
        if(jobs)
        dispatch(setJobs(jobs))
    }
}

export const createJob = (company: string, title: string, description:string, price: string,
                          email: string, phone: string, status: boolean): JobsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.createJob({
            company, title, description, price,
            email, phone, status
        })
        if (data.resultCode === 0) {
            dispatch(setIsAllJobs(true))
        }
    }
}

export const updateJob = (_id: string, company: string, title: string, description: string, price: string,
                           email: string, phone: string, status:boolean, createAt: string): JobsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.updateJob({
            _id, company, title, description, price,
            email, phone, status, createAt
        })
        if (data.resultCode === 0) {
            dispatch(setIsAllJobs(true))
        }
    }
}

export const deleteJob = (_id: string): JobsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.deleteJob(_id)
        if (data.resultCode === 0) {
            dispatch(setIsAllJobs(true))
        }
    }
}

export const getJobsCount = (): JobsThunkType =>{
    return async (dispatch) =>{
        const count = await mongodbAPI.getJobsCount()
        if(count)
            dispatch(setJobsCount(count))
    }
}


