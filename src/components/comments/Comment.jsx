import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteComment() {
        console.log();
        
    }

    render() {
        console.log(this.props.comment.userId);
        console.log(this.props.currentUser.id);
        return (
            <React.Fragment>
                <div class="author mb-4 d-flex align-items-center">
                    <a class="img" style={{ backgroundImage: `url(${this.props.comment.user.image})` }}></a>
                    <div class="ml-3 info">
                        <h3><b>{this.props.comment.user.firstName} {this.props.comment.user.lastName} </b></h3>
                        {this.props.comment.user.role === 'ADMIN' ? (<p style={{ color: "#019006" }}>Admin</p>) : ''}
                    </div>
                </div>
                <div>
                    <span style={{ display: 'block', width: '425px', wordWrap: 'break-word' }}>{this.props.comment.comment}</span><br />
        <span style={{ textAlign: 'right', marginLeft: '64%' }}><b>{new Date(this.props.comment.createdAt).toLocaleDateString().replace('/', '-').replace('/', '-')}</b></span>
                    {this.props.currentUser.role === 'ADMIN' || this.props.comment.userId === this.props.currentUser.id || this.props.currentUser.id === this.props.post.userId ? 
                    (<a style={{marginLeft: '2%'}} onClick={this.deleteComment} class="btn btn-danger" role="button">Delete</a>) 
                    : ''}
                </div>
                <hr />
            </React.Fragment>
        );
    }
}

export default Comment;