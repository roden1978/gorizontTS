import {
    SET_USERS, CHANGE_USERS_ITEM, SET_USERS_ITEM,
    SET_CURRENT_USERS_ID, SET_USERS_COUNT, IS_ALL_USERS,
    CREATE_USER_SUCCESS, SET_DEFAULT_USER, SET_ADMIN_ROOT_COUNT,
    IS_ADMIN_ROOT_COUNT
} from "../actions/types";

let initialState = {
    users: [],
    getUserItem: false,
    isAllUsers: false,
    currentUserId: null,
    usersCount: null,
    createUserSuccess: null,
    adminRootCount: null,
    isAdminRootCount: false
}

const users_reducer = (state = initialState, action) => {

    //let copyState;// = {...state};

    //debugger
    switch (action.type) {
        case SET_USERS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, users: action.payload
                //...state, news:[ ...state.news, {__id:'12345', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'}]//action.payload
            };
        }
        case  SET_USERS_ITEM:{
            return {
                ...state, getUserItem: action.payload
            }
        }
        case  IS_ALL_USERS:{
            return {
                ...state, isAllUsers: action.payload
            }
        }
        case  IS_ADMIN_ROOT_COUNT:{
            return {
                ...state, isAdminRootCount: action.payload
            }
        }
        case CHANGE_USERS_ITEM:{
            const usersItem  = state.users.find(user =>user._id === state.currentUserId)
            return {
                ...state, users: [usersItem]
            }
        }
        case SET_CURRENT_USERS_ID :{
            return{
                ...state, currentUserId: action.payload
            }
        }
        case SET_USERS_COUNT :{
            return{
                ...state, usersCount: action.payload
            }
        }
        case SET_ADMIN_ROOT_COUNT :{
            //debugger
            return{
                ...state, adminRootCount: action.payload
            }
        }
        case SET_DEFAULT_USER :{
            return{
                ...state, users: [{_id: '0', firstName: 'Войдите в панель администирования и создайте новость',
                    lastName: '!!!ВНИМАНИЕ!!! Если созданный пользователь не отобразился обновите страницу.',
                    email: '', password: '', root: null}]
            }
        }
        case CREATE_USER_SUCCESS:{
            //debugger
            return {
                ...state, createUserSuccess: action.payload
            }
        }

        default:
            return state;
    }
}

export default users_reducer;

/* [{__id:'123', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'},
        {__id:'1234', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'}]*/