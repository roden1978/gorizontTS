import {
    CHANGE_JOBS_ITEM,
    IS_ALL_JOBS,
    SET_CURRENT_JOBS_ID, SET_DEFAULT_JOB,
    SET_JOBS,
    SET_JOBS_COUNT,
    SET_JOBS_ITEM
} from "../actions/types"
import {JobType} from "../../tstypes/jobsTypes"

let initialState = {
    jobs: [] as Array<JobType>,
    isGetJobsItem: false,
    isAllJobs: false,
    currentJobsId: '',
    jobsCount: 0
}

export type InitialStateType = typeof initialState

const jobs_reducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_JOBS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
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
                ...state, jobs: [{_id: '0', company:'', title: 'Войдите в панель администирования и создайте объявление',
                    description: '!!!ВНИМАНИЕ!!! Если созданное объявление не отобразилась обновите страницу.',
                    price: '', email: '', phone: '', status: true, createAt: ''}]
            }
        }
        default:
            return state
    }
}

export default jobs_reducer