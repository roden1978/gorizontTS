import {
    CHANGE_JOBS_ITEM,
    IS_ALL_JOBS,
    SET_CURRENT_JOBS_ID, SET_DEFAULT_JOB,
    SET_JOBS,
    SET_JOBS_COUNT,
    SET_JOBS_ITEM
} from "../actions/types";

let initialState = {
    jobs: [],
    getJobsItem: false,
    isAllJobs: false,
    currentJobsId: null,
    jobsCount: null
}

const jobs_reducer = (state = initialState, action) => {

    //let copyState;// = {...state};

    //debugger
    switch (action.type) {
        case SET_JOBS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, jobs: action.payload
                //...state, news:[ ...state.news, {__id:'12345', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'}]//action.payload
            };
        }
        case  IS_ALL_JOBS:{
            return {
                ...state, isAllJobs: action.payload
            }
        }
        case  SET_JOBS_ITEM:{
            return {
                ...state, getJobsItem: action.payload
            }
        }
        case CHANGE_JOBS_ITEM:{
            const jobsItem  = state.jobs.find(item =>item._id === state.currentJobsId)
            return {
                ...state, jobs: [jobsItem]
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
                    price: '', email: '', phone: '', status: true}]
            }
        }
        default:
            return state;
    }
}

export default jobs_reducer;

/* [{__id:'123', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'},
        {__id:'1234', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'}]*/