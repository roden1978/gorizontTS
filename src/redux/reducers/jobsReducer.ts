import {
    CHANGE_JOBS_ITEM,
    IS_ALL_JOBS,
    SET_CURRENT_JOBS_ID, SET_DEFAULT_JOB,
    SET_JOBS,
    SET_JOBS_COUNT,
    SET_JOBS_ITEM,
    SET_JOBS_CURRENT_PAGE,
    SET_JOB_IS_SHOW_SPINNER
} from "../actions/types"
import {JobType} from "../../tstypes/jobsTypes"

let initialState = {
    jobs: [] as Array<JobType>,
    isGetJobsItem: false,
    isAllJobs: false,
    currentJobsId: '',
    jobsCount: 0,
    currentPage: 1,
    pageSize: 10,
    isShowSpinner: true
}

export type InitialStateType = typeof initialState

const jobs_reducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_JOBS: {
            return {
                ...state, jobs: action.payload
            }
        }
        case  IS_ALL_JOBS:{
            return {
                ...state, isAllJobs: action.payload
            }
        }
        case  SET_JOBS_ITEM:{
            return {
                ...state, isGetJobsItem: action.payload
            }
        }
        case CHANGE_JOBS_ITEM:{
            const jobsItem  = state.jobs.find((item: JobType) =>item._id === state.currentJobsId)
            return {
                ...state, jobs: [jobsItem as JobType]
            }
        }
        case SET_CURRENT_JOBS_ID :{
            return{
                ...state, currentJobsId: action.payload
            }
        }
        case SET_JOBS_COUNT :{
            return{
                ...state, jobsCount: action.payload
            }
        }
        case SET_DEFAULT_JOB :{
            return{
                ...state, jobs: [{_id: '0', company:'', title: 'Создайте первое объявление',
                    description: '!!!ВНИМАНИЕ!!! Если созданное объявление не отобразилась обновите объявление.',
                    price: '', email: '', phone: '', status: true, createAt: ''}]
            }
        }
        case SET_JOBS_CURRENT_PAGE:{
            return {
                ...state, currentPage: action.payload
            }
        }
        case SET_JOB_IS_SHOW_SPINNER:{
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default jobs_reducer