import React,{Component} from 'react'
import Article from './Article'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {checkAndLoadArticlesForPage} from '../AC'
import Loader from './Loader'
class ArticleList extends Component{

    componentWillMount(){
        this.props.checkAndLoadArticlesForPage(this.props.page)
    }
    componentWillReceiveProps({checkAndLoadArticlesForPage,page}){
        checkAndLoadArticlesForPage(page)
    }
    renderArticles=()=>{
        if(!this.props.articles.length) return <h3 className="empty-articles">NO ADDS</h3>
        if(!this.props.articlesPagination || this.props.paginationLoading) return <Loader/>
        const articles = this.props.articlesPagination.map((article)=>(
            <div className="article-item" key={article._id}>
                <Article
                    id={article._id}
                    fromArticleList
                />
            </div>
        ))
        return (
            <div className="row justify-content-center article-list">
                <div className="col-12 col-lg-10 col-xl-8">
                    {articles}
                </div>
                <div className="col-12 col-lg-10 col-xl-8 pagination-list">
                    {this.giveCommentsPagination()}
                </div>
            </div>
        )
    }
    giveCommentsPagination=()=>{
        const {articles} = this.props
        // if (loading || !total) return null
        if(!articles.length) return null
        const navs = []
        for(var i=1;i<=Math.floor((articles.length-1)/5)+1;i++){
            navs.push(<div className="pagination-list__item"  key={i}><NavLink activeStyle={{color: 'red'}} to={`/page/${i}`}>{i}</NavLink></div>)
        }
        return <div className="pagination-list__wrapper">{navs}</div>
    }
    render(){
        return(
            <section className="article-block">
                    <div className="container">

                            {this.renderArticles()}

                    </div>
            </section>
        )
    }
}

export default connect((state,ownProps)=>({
    articles:state.articlesState.articles,activeId:state.user.activeId,
    articlesPagination:state.articlesState.pagination[ownProps.page],
    paginationLoading:state.articlesState.paginationLoading
}),{checkAndLoadArticlesForPage})(ArticleList)