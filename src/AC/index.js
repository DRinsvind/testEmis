import {CHECK_USER,START,FAIL,FINISH,LOGOUT,DELETE_ARTICLE,CREATE_ARTICLE,LOAD_ARTICLES_FOR_PAGE,CHECK_ARTICLES,CHANGE_ARTICLE} from '../constants'
import {push,replace} from 'react-router-redux'
// export function checkUser(login,password) {
//     return{
//         type:CHECK_USER,
//         payload:{login,password},
//         callToMiddleUser:true
//     }
// }
export function checkAuthorization(){
    return(dispatch)=> {
        const userId = localStorage.activeUser
        if (userId !== undefined) {
            const users = JSON.parse(localStorage.users)
            var object = {
                type: CHECK_USER + FINISH,
                payload: {
                    activeId: null,
                    login: null
                }
            }
            users.forEach(user => {
                if (+user.id === +userId) {
                    object.payload.activeId = userId
                    object.payload.login = user.login
                }
            })
            dispatch(object)
        }
    }
}
export function checkArticles() {
    return (dispatch) => {
        const articles = localStorage.articles
        if(articles){
            let newArticles = JSON.parse(articles)
            dispatch({
                type:CHECK_ARTICLES,
                payload:{articles:newArticles}
            })
        }
    }
}
export function createArticle(article) {
    return (dispatch) => {
        dispatch({
            type: CREATE_ARTICLE + START
        })
        const articles = localStorage.articles
        if(articles){
            let artAr = JSON.parse(articles)
            artAr.push(article)
            localStorage.articles = JSON.stringify(artAr)
        }else{
            localStorage.articles = JSON.stringify([article])
        }
        setTimeout(()=>{
            dispatch({
                type:CREATE_ARTICLE + FINISH,
                payload:{article}
            })
            dispatch(replace(`/${article._id}`))
        },1000)
    }
}
export function logout() {
    return(dispatch)=> {
        dispatch({
            type: LOGOUT + START,
        })
        setTimeout(()=>{

            localStorage.removeItem('activeUser');
            dispatch({
                type:LOGOUT + FINISH,
            })
            dispatch(replace('/'))
        },1000)
    }
}
export function changeArticle(id,article) {
    return (dispatch) => {
        console.log('article',article)
        dispatch({
            type: CHANGE_ARTICLE + START
        })
        const articles = localStorage.articles
        if(articles){
            let artAr = JSON.parse(articles)
            let newArticles = artAr.filter(article=>article._id!==id)
            newArticles.push(article)
            localStorage.articles = JSON.stringify(newArticles)
        }
        setTimeout(()=>{
            dispatch({
                type:CHANGE_ARTICLE + FINISH,
                payload:{article,id}
            })
            dispatch(replace(`/${article._id}`))
        },1000)
    }
}
export  function checkAndLoadArticlesForPage(page) {
    return (dispatch, getState) => {

        const {articlesState}=getState()
        if(+page!==+page) return dispatch(replace('/404'))
        if(articlesState.paginationLoading) return

        if(articlesState.articles.length){
            let articles = [...articlesState.articles]
            articles.sort((articleA,articleB)=>{
                if(articleA._id>articleB._id) return -1
                if(articleA._id<articleB._id) return 1
            })
            let pagesCount = Math.ceil(articles.length/5)
            if(page>pagesCount) return dispatch(replace('/404'))
            let firstCount = (page -1)*5
            let lastCount = page*5-1
            let pageArticles = articles.filter((article,id)=>{
                return id>=firstCount && id<=lastCount
            })
            if(articlesState.pagination[page] && JSON.stringify([...articlesState.pagination[page]])===JSON.stringify(pageArticles)) return

            dispatch({
                type: LOAD_ARTICLES_FOR_PAGE+START,
            })
            setTimeout(()=>{
                dispatch({
                    type: LOAD_ARTICLES_FOR_PAGE+FINISH,
                    payload: {page,articles:pageArticles},
                })
            },1000)

        }else{
            if(+page!==1) return dispatch(replace('/404'))
        }

    }
}
export function deleteArticle(id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_ARTICLE+START,
            payload:{
                id:+id
            }
        })
        setTimeout(()=>{

            dispatch({
                type: DELETE_ARTICLE+FINISH,
                payload: {id},
            })
            const articles = localStorage.articles
            if(articles){
                let artAr = JSON.parse(articles)
                let newArticles = artAr.filter(article=>article._id!==id)
                localStorage.articles = JSON.stringify(newArticles)
            }
            dispatch(replace('/'))
        },1000)

    }
}
export function checkIdArticle(id) {
    return (dispatch, getState) => {


        if(!id) return dispatch(replace('/404'))
        const {articlesState} = getState()
        const check = articlesState.articles.some(art=>art._id===id)
        if(!check) return dispatch(replace('/404'))
        else {
            dispatch({
                type:'ARTICLE CORRECT',
            })
        }
    }
}
export function checkUser(login,password) {
    return(dispatch)=>{
        dispatch({
            type:CHECK_USER+START,
        })
        var localUsers = localStorage.getItem('users')
        if(!localUsers){
            let users = [{login,password,id:0}]
            localStorage.users = JSON.stringify(users)
            localStorage.activeUser = 0;
            setTimeout(()=>{
                dispatch({
                    type:CHECK_USER+FINISH,
                    payload:{activeId:0,login}
                })
                },1000)
        }else{
            let users = JSON.parse(localUsers)
            let user = users.filter(user=>user.login===login)
            if(user.length){
                let userProfile = user[0]
                if(userProfile.password===password){
                    localStorage.activeUser = userProfile.id;
                    setTimeout(()=>{
                        dispatch({
                            type:CHECK_USER+FINISH,
                            payload:{activeId:userProfile.id,login}
                        })
                    },1000)
                }else{
                    setTimeout(()=>{
                        dispatch({
                            type:CHECK_USER+FINISH+FAIL,
                        })
                    },1000)
                }
            }else{
                users.push({login,password,id:users.length})
                localStorage.users = JSON.stringify(users)
                localStorage.activeUser = users.length-1
                setTimeout(()=>{
                    dispatch({
                        type:CHECK_USER+FINISH,
                        payload:{activeId:users.length-1,login}
                    })
                },1000)
            }

        }
    }
}