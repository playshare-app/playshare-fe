import React, { Component } from 'react'

export class Comment extends Component {
    render() {
        return (
         
                <div className="one-comment">
                        {this.props.onecomment}
                 </div> 
      
        )
    }
}
