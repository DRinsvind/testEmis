import React,{Component} from 'react'
import Article from './Article'
import {connect} from 'react-redux'
class SingleArticle extends Component{

    render(){
        return(

            <section className="article-block article-block--single-article">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <div className="article-item">
                                <Article id={this.props.id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default SingleArticle