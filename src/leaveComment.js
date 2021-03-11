import React, { Component } from 'react'
import { Comment } from './commentText.js';

export class CommentBox extends Component {

    state = { 
        comments: ['comment1', 'comment1', 'comment1', 'comment1', 'comment1' ]
    }


    handleCommentChange = (e) => { 
        console.log(e.target.value)
        this.setState = { 
            comments: e.target.value
        }
        
    }
    
    handleSubmitComment = async(e) => { 
        e.preventDefault()

        


    }

    render() {
        let allComments = this.state.comments.map((onecomment) => (<Comment onecomment={onecomment}/>))
        return (
            <div>
                <form>
                    <input type="text" placeholder="leave a comment" onChange={this.handleCommentChange}></input><br/>
                    <button>Leave a comment!</button>
                </form>
                    <div className="comment-scroll">Comment Box
                       {allComments} 
                    </div>
            </div>
        )
    }
}
