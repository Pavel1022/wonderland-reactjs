import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteComment = (event) => {
        const id = this.props.comment.id;

        axios.get('http://localhost:3100/api/comment/delete/' + id).then(res => {
            if(res.data === 'SUCCESS') {
                window.location.reload();
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="author mb-4 d-flex align-items-center">
                    <a className="img" style={{ backgroundImage: `url(http://localhost:3100/public/user/${this.props.comment.user.image}.jpg)` }}></a>
                    <div className="ml-3 info">
                        <h3><b>{this.props.comment.user.firstName} {this.props.comment.user.lastName} </b></h3>
                        {this.props.comment.user.role === 'ADMIN' ? (<p style={{ color: "#019006" }}>Admin</p>) : ''}
                    </div>
                </div>
                <div>
                    <span style={{ display: 'block', width: '425px', wordWrap: 'break-word' }}>{this.props.comment.comment}</span><br />
        <span style={{ textAlign: 'right', marginLeft: '64%' }}><b>{new Date(this.props.comment.createdAt).toLocaleDateString().replace('/', '-').replace('/', '-')}</b></span>
                    {this.props.currentUser.role === 'ADMIN' || this.props.comment.userId === this.props.currentUser.id || this.props.currentUser.id === this.props.post.userId ? 
                    (<button style={{marginLeft: '2%'}} onClick={this.deleteComment} className="btn btn-danger" role="button">Delete</button>) 
                    : ''}
                </div>
                <hr />
            </React.Fragment>
        );
    }
}

export default Comment;