import {JobType} from "../../tstypes/jobsTypes"
import {JobsActionType} from '../actions/jobsActions'

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

const jobs_reducer = (state = initialState, action: JobsActionType): InitialStateType => {
    switch (action.type) {
        case 'GT/JOB/SET_JOBS': {
            return {
                ...state, jobs: action.payload
            }
        }
        case  "GT/JOB/IS_ALL_JOBS":{
            return {
                ...state, isAllJobs: action.payload
            }
        }
        case "GT/JOB/SET_JOBS_ITEM":{
            return {
                ...state, isGetJobsItem: action.payload
            }
        }
        case "GT/JOB/CHANGE_JOBS_ITEM":{
            const jobsItem  = state.jobs.find((item: JobType) =>item._id === state.currentJobsId)
            return {
                ...state, jobs: [jobsItem as JobType]
            }
        }
        case "GT/JOB/SET_CURRENT_JOBS_ID" :{
            return{
                ...state, currentJobsId: action.payload
            }
        }
        case "GT/JOB/SET_JOBS_COUNT" :{
            return{
                ...state, jobsCount: action.payload
            }
        }
        case "GT/JOB/SET_DEFAULT_JOB" :{
            return{
                ...state, jobs: [{_id: '0', company:'', title: 'Создайте первое объявление',
                    description: '!!!ВНИМАНИЕ!!! Если созданное объявление не отобразилась обновите объявление.',
                    price: '', email: '', phone: '', status: true, createAt: ''}]
            }
        }
        case "GT/JOB/SET_CURRENT_PAGE":{
            return {
                ...state, currentPage: action.payload
            }
        }
        case "GT/JOB/SET_JOB_IS_SHOW_SPINNER":{
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default jobs_reducer