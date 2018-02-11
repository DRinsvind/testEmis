import React,{Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader'
import {createArticle,changeArticle,checkIdArticle} from '../AC'
class CreatingForm extends Component{
    state = {
        title:'',
        text:'',
        error:false,
        checkArticle:true
    }
    changeInput = type => e=>{
        if(this.state.checkArticle){
            this.setState({
                title:this.refs.title.value,
                text:this.refs.text.value,
                [type]:e.target.value,
                checkArticle:false
            })
        }else{
            this.setState({
                [type]:e.target.value
            })
        }
    }
    componentDidUpdate(){
        if(this.props.id){
            this.props.checkIdArticle(this.props.id)
        }
    }
    getValueTitle = () =>{
        if(this.props.article && this.state.checkArticle) return this.props.article.title
        return this.state.title
    }
    getValueText = () =>{
        if(this.props.article && this.state.checkArticle) return this.props.article.text
        return this.state.text
    }
    handleButtonClick = (ev) =>{
        ev.preventDefault()
        if(!this.refs.title.value || !this.refs.text.value){
            return this.setState({error:true})
        }
        if(this.props.article){
            const article = {
                _id:this.props.article._id,
                text:this.refs.text.value,
                registered:this.props.article.registered,
                author: this.props.activeName,
                title:this.refs.title.value,
                creator: this.props.activeId

            }
            this.props.changeArticle(this.props.article._id,article)
        }else{
            const date = new Date( Date.now()).toDateString()
            const article={
                _id: (Date.now()).toString(),
                text: this.state.text,
                author: this.props.activeName,
                registered: date,
                title: this.state.title,
                creator: this.props.activeId
            }
            this.props.createArticle(article)
        }

    }
    checkError = () =>{

        if(this.state.error){
            return(
                <h2 className="user-error">
                    HEADING AND TEXT SHOULDN'T BE EMPTY</h2>
            )
        }
    }
    render(){
        if(this.props.creating) return <Loader/>
        if(this.props.updating) return <Loader/>
        return(
            <section className="article-block">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="article-item">
                                <div className="article-item__wrapper">
                                    <div className="input-wrapper input-wrapper--article-form">
                                        <input
                                            className='user-input user-input--article-form'
                                            type="text"
                                            value={this.getValueTitle()}
                                            onChange={this.changeInput('title')}
                                            ref='title'
                                            placeholder="Enter your title"/>
                                            <div className="input-efect">
                                                <hr/>
                                            </div>
                                    </div>
                                    <div className="input-wrapper input-wrapper--article-form">
                                        <textarea
                                            className='user-input user-input--article-form'
                                            placeholder="Enter your text"
                                            value={this.getValueText()}
                                            ref="text"
                                            onChange={this.changeInput('text')}
                                        />
                                        <div className="input-efect">
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="uarticle-item__buttons-block">
                                        <button className="user-button" onClick={this.handleButtonClick}>
                                            {this.props.article?'Change':'Create'}
                                        </button>
                                    </div>
                                    {this.checkError()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}

export default connect((state,ownProps)=>{
    var article=false
    if(ownProps.id){
        article = state.articlesState.articles.filter(article=>article._id===ownProps.id)[0]
    }
    return {
        activeId:state.user.activeId,
        activeName:state.user.activeName,
        creating:state.articlesState.creating,
        article:article,
        updating:state.articlesState.updating
    }
},{createArticle,changeArticle,checkIdArticle})(CreatingForm)