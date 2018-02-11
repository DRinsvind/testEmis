import React,{Component} from 'react'
import UserComponent from './UserComponent'
import ArticleList from './ArticleList'
import ChangeWrapper from './ChangeWrapper'
import CreatingForm from './CreatingForm'
import Page404 from './Page404'
import SingleArticle from './SingleArticle'
import {Route,Switch,Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import history from '../history'
class App extends Component{

    getArticlesList=({match})=>{
        const {page} = match.params
        return <ArticleList page={page}/>
    }
    getArticle=({match})=>{
        const {id} = match.params
        return <SingleArticle id={id}/>
    }
    getChangeWrapper=({match})=>{
        const {id} = match.params
        return <ChangeWrapper id={id}/>
    }
    render(){

        return(

                <ConnectedRouter history={history}>
                    <div>

                        <Route path = "/" component = {UserComponent}/>
                        <Switch>
                            <Route exact path="/" render={() => (

                                    <Redirect to="/page/1"/>

                            )}/>
                            <Route path = "/page/:page" component = {this.getArticlesList} exact/>
                            <Route path = "/edit" component = {CreatingForm} exact/>
                            <Route path = "/edit/:id" component = {this.getChangeWrapper} exact/>
                            <Route path = "/404" component = {Page404}/>
                            <Route path = "/:id" render = {this.getArticle}/>


                        </Switch>
                    </div>
                </ConnectedRouter>

        )
    }
}

export default App