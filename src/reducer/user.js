import {CHECK_USER,START,FAIL,FINISH,LOGOUT} from '../constants'
const UserDefaultState = {
    loading:false,
    activeId:null,
    activeName:null,
    error:null
}
export default (UserState=UserDefaultState,action)=>{
    const {type,payload} = action
    switch(type){
        case CHECK_USER+START:
            return {
                ...UserState,loading:true,
            }
        case CHECK_USER+FINISH+FAIL:
            return {
                ...UserState,loading:false,error:true
            }
        case CHECK_USER+FINISH:
            return {
                ...UserState,loading:false,error:false,activeId:payload.activeId,activeName:payload.login
            }
        case LOGOUT+START:
            return {
                ...UserState,loading:true,
            }
        case LOGOUT+FINISH:
            return {
                ...UserState,loading:false,activeId:null,activeName:null
            }

    }
    return UserState
}