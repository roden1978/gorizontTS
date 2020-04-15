import React from 'react'
import {
    getJobs, getAllJobs, updateJob, createJob, deleteJob,
    setChangeJobsItem, setCurrentJobsId, setIsAllJobs, setJobsCount,
    setJobsItem, setDefaultJob
} from '../../redux/actions/jobsActions'
import Jobs from "./Jobs"
import {connect} from "react-redux"
import Spinner from "../../common/Spinner"
import {JobType} from "../../tstypes/jobsTypes"
import {AppStateType} from "../../redux/store"

type MapStateToPropsType = {
    jobs: Array<JobType>
    isAllJobs: boolean
    getJobsItem: boolean
    currentJobsId: string
    jobsCount: number
    adminMode: boolean
}

type MapDispatchToPropsType = {
    getJobs: () => void
    getAllJobs: () => void
    updateJob: (id: string, company: string, title: string, description: string, price: string,
                email: string, phone: string, status:boolean, createAt: string) => void
    createJob: (company: string, title: string, description:string, price: string,
                email: string, phone: string, status: boolean) => void
    deleteJob: (id: string) => void
    setChangeJobsItem: () => void
    setCurrentJobsId: (id: string) => void
    setIsAllJobs: (setIsAllJobs: boolean) => void
    setJobsCount: (count: number) => void
    setJobsItem: (jobsItem: boolean) => void
    setDefaultJob: () => void
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType

type PrevStateType = MapStateToPropsType

class JobsContainer extends React.Component<PropsType> {

    componentDidMount() {
        //debugger
        if (this.props.adminMode)
            this.props.getAllJobs()
        else
            this.props.getJobs()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {

        if (this.props.getJobsItem) {
            this.props.setChangeJobsItem()
            this.props.setJobsItem(false)
        }

        if (this.props.isAllJobs && this.props.adminMode) {
            //setTimeout(null, 2000)
            this.props.getAllJobs()
            this.props.setIsAllJobs(false)
        }
        if (this.props.jobs.length === 0) {
            this.props.setDefaultJob()
        }
    }

    render() {
        return (
            <>
                {this.props.jobs && this.props.jobs.length === 0 ? <Spinner/> : <Jobs {...this.props}/>}
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        jobs: state.jobs.jobs,
        isAllJobs: state.jobs.isAllJobs,
        getJobsItem: state.jobs.isGetJobsItem,
        currentJobsId: state.jobs.currentJobsId,
        jobsCount: state.jobs.jobsCount,
        adminMode: state.auth.adminMode
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getJobs, getAllJobs, updateJob, createJob, deleteJob,
    setChangeJobsItem, setCurrentJobsId, setIsAllJobs,
    setJobsCount, setJobsItem, setDefaultJob
})(JobsContainer)
/*
jobs={this.props.jobs}
 */