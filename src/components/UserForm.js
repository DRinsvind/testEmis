import React,{Component} from 'react'
import {Link,Switch,Route,NavLink} from 'react-router-dom'
class UserForm extends Component{

    getCreateLink = () =>{
        return(
            <Link to="/edit" className="user-button">Create Ad</Link>
        )
    }
    getHome = () =>{
        return(
            <Link to="/" className="user-button">ALL ADS</Link>
        )
    }
    render(){

        return(
            <div>
                <h2 className="user-heading">Hello {this.props.name}!</h2>

                <div className="user-buttons">
                    <Switch>
                        <Route path="/edit" />
                        <Route path="/*" render={this.getCreateLink} />
                    </Switch>
                    <Switch>
                        <Route path="/" exact/>
                        <Route path="/page" />
                        <Route path="/*" render={this.getHome} />
                    </Switch>
                    <button className="user-button" onClick={this.props.logout}>Logout</button>

                </div>
            </div>
        )
    }
}

export default UserForm