import React, { Component } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

export default class Comment extends Component {
  state = {
    isEditing: false,
    content: ""
  }

  toggleEdit = () => {
    this.setState({
      ...this.state,
      isEditing: !this.state.isEditing
    })
  }

  checkOwnership(currentUser, postID, userID, commentID) {
    const commentdata = {
      comment_id: commentID,
      post_id: postID,
      content: this.state.content
    }
    if (currentUser.id === userID) {
      return (
      <div className="edit-delete-container">
        {this.state.isEditing ? 
          <>
            <button className="info-save" onClick={
              () => this.props.updateComment(commentdata)}
            >Save</button>
            <button className="info-cancel" onClick={this.toggleEdit}>Cancel</button>
          </>
          :
          <>
            <button className="timestamp total-comments edit-info" onClick={this.toggleEdit}>
              <FaPen />
            </button>
            <button className="timestamp total-comments delete-info" onClick={() => this.handleDelete(commentID, postID)}>
              <FaTrash />
            </button>
          </>
          }
      </div>
      );
    }
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleDelete = (commentID, postID) => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      this.props.removeComment(commentID, postID)
    }
  }

  render() {
    const {
      id,
      userID,
      currentUser,
      content,
      author,
      created,
      updated,
      edited,
      postID
    } = this.props;
    return(
      <li className="comment">
        <div className="comment-author">{author}</div>
        <div className="comment-text-and-meta-data">
          { this.state.isEditing ? 
            <input
              defaultValue={content}
              name="content"
              onChange={this.handleChange}
              className="edit-input"
              autoFocus={true}
            /> 
            :
            <div className="comment-text">
              {content}
            </div>
          }
          <div className="meta_data">
            <div className="timestamp_wrapper">
              { !edited ? <span className="timestamp">{created}</span> : <span className="timestamp">{updated} (edited)</span> }
            </div>
            {this.checkOwnership(currentUser, postID, userID, id)}
          </div>
        </div>
      </li>
    )
  }
}