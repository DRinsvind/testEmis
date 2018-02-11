import React,{Component} from 'react'
import {connect} from 'react-redux'
import {deleteArticle,checkIdArticle} from '../AC'
import {Link} from 'react-router-dom'
import Loader from './Loader'
class Article extends Component{

    handleDeleteArticle = () =>{
        this.props.deleteArticle(this.props.article._id)
    }
    componentDidMount(){
        this.props.checkIdArticle(this.props.id)
    }
    getTitle = () =>{
        console.log('проблемный пропс',this.props)
        if(this.props.fromArticleList){
            return (
                <Link className="article-item__heading" to={`/${this.props.article._id}`}>{this.props.article.title}</Link>
            )
        }else{
            return(
                <h2 className="article-item__heading">SINGLE PAGE : {this.props.article.title}</h2>
            )
        }
    }
    renderActionPanel = () =>{
        if(this.props.activeId!== null && +this.props.activeId===+this.props.article.creator){
            return(
                <div className="article-item__buttons-block">
                    <Link to={`/edit/${this.props.article._id}`} className="user-button">Edit</Link>
                    <button className="user-button" onClick={this.handleDeleteArticle}>Delete</button>
                </div>
            )
        }
    }
    render(){
        const {article} = this.props
        if(this.props.article && (+this.props.id!==this.props.deletedArticle)){
            return(

                <div className="article-item__wrapper">
                    <div className="article-item__top-side">
                        {this.getTitle()}
                        <p className="article-item__author-block">{article.author}</p>
                    </div>
                    <p className="article-item__text">
                        {article.text}
                    </p>
                    <p className="article-item__date">{article.registered}</p>
                    {this.renderActionPanel()}
                </div>


            )
        }else{
            return(
                <div className="article-item__wrapper">
                    <Loader/>
                </div>
            )
        }

    }
}

export default connect((state,ownProps)=>({
    activeId:state.user.activeId,
    article:state.articlesState.articles.filter(article=>article._id===ownProps.id)[0],
    updating:state.articlesState.updating,
    deletedArticle:state.articlesState.deletedArticle
}),{deleteArticle,checkIdArticle})(Article)
