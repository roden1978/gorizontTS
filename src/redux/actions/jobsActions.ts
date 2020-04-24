import {mongodbAPI} from '../../api/api'
import {JobType} from "../../tstypes/jobsTypes"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"

export type JobsActionType = ActionsTypes<typeof jobsActions>
export const jobsActions = {
    setJobs: (jobs: Array<JobType>) => (
        {
            type: 'GT/JOB/SET_JOBS',
            payload: jobs
        } as const
    ),
    setIsAllJobs: (isAllJobs: boolean) => (
        {
            type: 'GT/JOB/IS_ALL_JOBS',
            payload: isAllJobs
        } as const
    ),
    setChangeJobsItem: () => (
        {
            type: 'GT/JOB/CHANGE_JOBS_ITEM'
        } as const
    ),
    setDefaultJob: () => (
        {
            type: 'GT/JOB/SET_DEFAULT_JOB'
        } as const
    ),
    setJobsItem: (isSetJobsItem: boolean) => (
        {
            type: 'GT/JOB/SET_JOBS_ITEM',
            payload: isSetJobsItem
        } as const
    ),
    setCurrentJobsId: (id: string) => (
        {
            type: 'GT/JOB/SET_CURRENT_JOBS_ID',
            payload: id
        } as const
    ),
    setJobsCount: (count: number) => (
        {
            type: 'GT/JOB/SET_JOBS_COUNT',
            payload: count
        } as const
    ),
    setJobsCurrentPage: (currentPage: number) => (
        {
            type: 'GT/JOB/SET_CURRENT_PAGE',
            payload: currentPage
        } as const
    ),
    setIsShowSpinner: (isShowSpinner: boolean) => (
        {
            type: 'GT/JOB/SET_JOB_IS_SHOW_SPINNER',
            payload: isShowSpinner
        } as const
    )
}


export type JobsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, JobsActionType>
/*Thunk Creators*/
export const getJobs = (): JobsThunkType => {
    return async (dispatch) => {
        const jobs = await mongodbAPI.getJobs()
        if(jobs)
        dispatch(jobsActions.setJobs(jobs))
    }
}
export const getAllJobs = (currentPage: number, pageSize: number): JobsThunkType => {
    return async (dispatch) => {
        const jobs = await mongodbAPI.getAllJobs(currentPage, pageSize)
        if(jobs)
        dispatch(jobsActions.setJobs(jobs))
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
            dispatch(jobsActions.setIsAllJobs(true))
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
            dispatch(jobsActions.setIsAllJobs(true))
        }
    }
}

export const deleteJob = (_id: string): JobsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.deleteJob(_id)
        if (data.resultCode === 0) {
            dispatch(jobsActions.setIsAllJobs(true))
        }
    }
}

export const getJobsCount = (): JobsThunkType =>{
    return async (dispatch) =>{
        const count = await mongodbAPI.getJobsCount()
        if(count)
            dispatch(jobsActions.setJobsCount(count))
    }
}


