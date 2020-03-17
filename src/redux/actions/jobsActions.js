import {mongodbAPI} from '../../api/api'
import {
    CHANGE_JOBS_ITEM,
    IS_ALL_JOBS,
    SET_CURRENT_JOBS_ID,
    SET_JOBS,
    SET_JOBS_COUNT,
    SET_JOBS_ITEM,
    SET_DEFAULT_JOB
} from "./types";

/*Создаем объекты action с обязательным свойством type*/
export const setJobs = (jobs) => {
    return {
        type: SET_JOBS,
        payload: jobs
    }
}
export const setIsAllJobs = (isAllJobs) => {
    return {
        type: IS_ALL_JOBS,
        payload: isAllJobs
    }
}

export const setChangeJobsItem = () => {
    return {
        type: CHANGE_JOBS_ITEM
    }
}
export const setDefaultJob = () => {
    return {
        type: SET_DEFAULT_JOB
    }
}
export const setJobsItem = (jobsItem) => {
    return {
        type: SET_JOBS_ITEM,
        payload: jobsItem
    }
}

export const setCurrentJobsId = (id) => {
    return {
        type: SET_CURRENT_JOBS_ID,
        payload: id
    }
}
export const setJobsCount = (count) => {
    return {
        type: SET_JOBS_COUNT,
        payload: count
    }
}

/*Thunk Creators*/
export const getJobs = () => {
    return async (dispatch) => {
        const jobs = await mongodbAPI.getJobs();
        dispatch(setJobs(jobs));
    }
}
export const getAllJobs = () => {
    return async (dispatch) => {
        const jobs = await mongodbAPI.getAllJobs();
        dispatch(setJobs(jobs));
    }
}

export const createJob = (company, title, description, price,
                          email, phone, status) => {
    //debugger
    return async (dispatch) => {
        const data = await mongodbAPI.createJob({
            company, title, description, price,
            email, phone, status
        });
        if (data.resultCode === 0) {
            dispatch(getAllJobs());
        }
    }
}

export const updateJob = (id, company, title, description, price,
                           email, phone, status, createAt) => {
    //debugger
    return async (dispatch) => {
        const data = await mongodbAPI.updateJob({
            id, company, title, description, price,
            email, phone, status, createAt
        });
        if (data.resultCode === 0) {
            dispatch(getAllJobs());
        }
    }
}

export const deleteJob = (id) => {
    //debugger
    return async (dispatch) => {
        const data = await mongodbAPI.deleteJob({id});
        if (data.resultCode === 0) {
            dispatch(getAllJobs());
        }
    }
}


