import {combineReducers} from 'redux'
import articlesState from './articles'
import user from './user'
import {routerReducer} from 'react-router-redux'
export default combineReducers({
    articlesState,user,router:routerReducer
})