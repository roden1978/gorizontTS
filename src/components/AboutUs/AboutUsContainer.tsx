import React from 'react'
import {
    getAbout, setIsChangedAbout,
    updateAbout, setDefaultAbout,
    createAbout, setIsShowSpinner
} from '../../redux/actions/aboutActions'
import AboutUs from "./AboutUs"
import {connect} from "react-redux"
import Spinner from "../../common/Spinner"
import {AppStateType} from "../../redux/store"
import {AboutType} from "../../tstypes/aboutTypes"

type MapStateToPropsType = {
    about: Array<AboutType>
    adminMode: boolean
    isChangedAbout: boolean,
    isShowSpinner: boolean
}

type MapDispatchToPropsType = {
    getAbout: () => void
    setIsChangedAbout: (setIsChangedAbout: boolean) => void
    createAbout: (text: string) => void
    updateAbout: (id: string, text: string) => void
    setDefaultAbout: () => void
    setIsShowSpinner: (isShowSpinner: boolean) => void
}
export type PropsType = MapStateToPropsType & MapDispatchToPropsType
type PrevPropsType = MapStateToPropsType

class AboutUsContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getAbout()

        setTimeout(() => {
            this.props.setIsShowSpinner(false)
        }, 3000)
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevPropsType) {

        if (this.props.isChangedAbout) {
            this.props.getAbout()
            this.props.setIsChangedAbout(false)
        }
        if (this.props.about && this.props.about.length === 0 && this.props.adminMode) {
            this.props.setDefaultAbout()
        }
    }

    componentWillUnmount(): void {
        this.props.about.length = 0
    }

    render() {
        return (
            <>
                {this.props.about && this.props.about.length === 0 && this.props.isShowSpinner ? <Spinner/> :
                    <AboutUs {...this.props}/>}
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        about: state.about.about,
        adminMode: state.auth.adminMode,
        isChangedAbout: state.about.isChangedAbout,
        isShowSpinner: state.about.isShowSpinner
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getAbout, setIsChangedAbout,
    createAbout, updateAbout,
    setDefaultAbout, setIsShowSpinner
})(AboutUsContainer)

