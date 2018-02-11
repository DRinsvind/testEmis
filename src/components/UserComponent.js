import React,{Component} from 'react'
import LoginForm from './LoginForm'
import UserForm from './UserForm'
import {connect} from 'react-redux'
import Loader from './Loader'
import {logout,checkAuthorization,checkArticles} from '../AC'
class UserComponent extends Component{
    componentDidMount(){
        this.props.checkAuthorization()
        this.props.checkArticles()
    }
    checkStatus = () =>{
        if(this.props.user.loading){
            return <Loader/>
        }else if(this.props.user.activeId!==null){
            return(
                <UserForm name={this.props.user.activeName} logout={this.props.logout}/>
            )
        }else{
            return <LoginForm/>
        }
    }
    render(){

        return(
            <section className="user-block">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-xl-6">
                            <div  className="user-form">
                                {this.checkStatus()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(state=>({user:state.user}),{logout,checkAuthorization,checkArticles})(UserComponent)