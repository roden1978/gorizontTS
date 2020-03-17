import React from 'react';
import {
    getJobs, getAllJobs, updateJob, createJob, deleteJob,
    setChangeJobsItem, setCurrentJobsId, setIsAllJobs, setJobsCount,
    setJobsItem, setDefaultJob
} from '../../redux/actions/jobsActions';
import Jobs from "./Jobs";
import {connect} from "react-redux";
import Spinner from "../../common/Spinner";

class JobsContainer extends React.Component {

    componentDidMount() {
        //debugger
        if (this.props.adminMode)
            this.props.getAllJobs();
        else
            this.props.getJobs();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.getJobsItem) {
            this.props.setChangeJobsItem();
            this.props.setJobsItem(false);
        }

        if (this.props.isAllJobs && this.props.adminMode) {
            setTimeout(null, 2000);
            this.props.getAllJobs();
            this.props.setIsAllJobs(false);
        }
        if (this.props.jobs.length === 0) {
            this.props.setDefaultJob();
        }
    }

    render() {
        return (
            <>
                {this.props.jobs.length === 0 ? <Spinner/> : null}
                <Jobs {...this.props}/>
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs,
        isAllJobs: state.jobs.isAllJobs,
        getJobsItem: state.jobs.getJobsItem,
        currentJobsId: state.jobs.currentJobsId,
        jobsCount: state.jobs.jobsCount,
        adminMode: state.auth.adminMode
    }
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps, {
    getJobs, getAllJobs, updateJob, createJob, deleteJob,
    setChangeJobsItem, setCurrentJobsId, setIsAllJobs,
    setJobsCount, setJobsItem, setDefaultJob
})(JobsContainer);
/*
jobs={this.props.jobs}
 */