import {articles,DELETE_ARTICLE,CREATE_ARTICLE,START,FINISH,FAIL,CHECK_ARTICLES,CHANGE_ARTICLE,LOAD_ARTICLES_FOR_PAGE} from '../constants'
const ArticlesDefaultState = {
    creating: false,
    articles:articles,
    updating:false,
    deletedArticle:null,
    paginationLoading:false,
    pagination:{

    }
}
export default (articlesState=ArticlesDefaultState,action)=>{
    const {type,payload} = action
    switch(type){
        case LOAD_ARTICLES_FOR_PAGE+START:
            return{
                ...articlesState,paginationLoading:true
            }

        case LOAD_ARTICLES_FOR_PAGE+FINISH:

            return{
                ...articlesState,paginationLoading:false,pagination:{
                    ...articlesState.pagination,[payload.page]:payload.articles
                }
            }
        case CHECK_ARTICLES:
            return{
                ...articlesState,articles:payload.articles
            }
        case DELETE_ARTICLE+START:
            return {
                ...articlesState, updating:true,deletedArticle:payload.id
            }
        case DELETE_ARTICLE+FINISH:
            return {
                ...articlesState, updating:false,deletedArticle:null,articles:articlesState.articles.filter((article)=>article._id!==payload.id)
            }
        case CREATE_ARTICLE + START:
            return{
                ...articlesState, creating:true
            }
        case CREATE_ARTICLE + FINISH:
            return{
                ...articlesState, creating:false,
                    articles:[
                        ...articlesState.articles, payload.article
                    ]
            }
        case CHANGE_ARTICLE + START:
            return{
                ...articlesState, updating:true
            }
        case CHANGE_ARTICLE + FINISH:
            const newArticles = articlesState.articles.filter(article=>+article._id!==+payload.article._id)
            newArticles.push(payload.article)
            return{
                ...articlesState, updating:false,
                articles:newArticles
            }
    }
    return articlesState
}