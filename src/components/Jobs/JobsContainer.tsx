import React from 'react'
import {
    getJobs, getAllJobs, updateJob, createJob, deleteJob,
    setChangeJobsItem, setCurrentJobsId, setIsAllJobs, setJobsCount,
    setJobsItem, setDefaultJob, setJobsCurrentPage, getJobsCount,
    setIsShowSpinner
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
    currentPage: number
    pageSize: number
    isShowSpinner: boolean
}

type MapDispatchToPropsType = {
    getJobs: () => void
    getAllJobs: (currentPage: number, pageSize: number) => void
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
    setJobsCurrentPage: (currentPage: number) => void
    getJobsCount: () => void
    setIsShowSpinner: (isShowSpinner: boolean) => void
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType

type PrevStateType = MapStateToPropsType

class JobsContainer extends React.Component<PropsType> {

    componentDidMount() {
        if (this.props.adminMode){
            this.props.getJobsCount()
            this.props.getAllJobs(this.props.currentPage, this.props.pageSize)
        }
        else
            this.props.getJobs()

        setTimeout(() => {
            this.props.setIsShowSpinner(false)
        }, 3000);
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {

        if (this.props.getJobsItem) {
            this.props.setChangeJobsItem()
            this.props.setJobsItem(false)
        }

        if (this.props.isAllJobs && this.props.adminMode) {
            this.props.getJobsCount()
            this.props.getAllJobs(this.props.currentPage, this.props.pageSize)
            this.props.setIsAllJobs(false)
        }
        if (this.props.jobs && this.props.jobs.length === 0 && this.props.adminMode) {
            this.props.setDefaultJob()
        }
    }

    render() {
        return (
            <>
                {this.props.jobs && this.props.jobs.length === 0 && this.props.isShowSpinner ? <Spinner/> : <Jobs {...this.props}/>}
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
        adminMode: state.auth.adminMode,
        currentPage: state.jobs.currentPage,
        pageSize: state.jobs.pageSize,
        isShowSpinner: state.jobs.isShowSpinner
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getJobs, getAllJobs, updateJob, createJob, deleteJob,
    setChangeJobsItem, setCurrentJobsId, setIsAllJobs,
    setJobsCount, setJobsItem, setDefaultJob, setJobsCurrentPage,
    getJobsCount, setIsShowSpinner
})(JobsContainer)