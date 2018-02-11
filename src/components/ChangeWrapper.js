import React,{Component} from 'react'
import CreatingForm from './CreatingForm'
class ChangeWrapper extends Component{



    render(){

        return(

            <CreatingForm id={this.props.id}/>

        )
    }
}

export default ChangeWrapper