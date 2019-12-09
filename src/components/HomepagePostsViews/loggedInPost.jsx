import React, { Component } from 'react';

class LoggedInPost extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const date = this.props.post.createdAt;
        
        return (
            <React.Fragment>
                <div className="block-21 mb-4 d-flex">
                    <a href={'/post/view/' + this.props.post.id} className="blog-img mr-4" style={{ backgroundImage: `url(${this.props.post.image})` }}></a>
                    <div className="text">
                        <h3 className="heading"><a href={'/post/view/' + this.props.post.id}>{this.props.post.title}</a>
                        </h3>
                        <div className="meta">
                            <div><a><i className="icon-calendar"></i>{date.split('T')[0].split('-')[2] + '-' + date.split('T')[0].split('-')[1] + '-' + date.split('T')[0].split('-')[0]}</a></div>
                            <div><a><i className="icon-calendar"></i>{ '/ Comments: ' + this.props.commentObj[`${this.props.post.id}`]}</a></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoggedInPost;