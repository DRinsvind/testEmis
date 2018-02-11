import React,{Component} from 'react'
import {checkUser} from '../AC'
import {connect} from 'react-redux'
class LoginForm extends Component{
    state = {
        login:'',
        password:'',
        error:false
    }
    changeInput = type => e=>{
        this.setState({
            [type]:e.target.value
        })
    }

    handleButtonClick = (ev) =>{
        ev.preventDefault()
        if(!this.state.login || !this.state.password){

            return this.setState({error:true})
        }
        this.props.checkUser(this.state.login,this.state.password)
    }
    checkError = () =>{
        if(this.props.user.error){
            return(
                <h2 className="user-error">PASSWORD IS INCORRECT</h2>
            )
        }
        else if(this.state.error){
            return(
                <h2 className="user-error">
                    LOGIN AND PASSWORD SHOULDN'T BE EMPTY</h2>
            )
        }
    }
    render(){
        return(
            <div className="user-form__wrapper">
                <div className="input-wrapper">
                    <input className="user-input"
                           type="text"
                           placeholder="Enter your login"
                           value={this.state.login}
                           onChange={this.changeInput('login')}/>
                    <div className="input-efect">
                        <hr />
                    </div>
                </div>
                <div className="input-wrapper">
                    <input className="user-input"
                           type="password"
                           placeholder="Enter your password"
                           value={this.state.password}
                           onChange={this.changeInput('password')}/>
                    <div className="input-efect">
                        <hr />
                    </div>
                </div>
                <div className="user-buttons">
                    <button className="user-button" onClick={this.handleButtonClick}>Login</button>
                </div>
                {this.checkError()}
            </div>
        )
    }
}

export default connect(state=>({user:state.user}),{checkUser})(LoginForm)