import React from 'react';
import Comment from './Comment';
import Loading from '../static/Loading';

const CommentList = ({ comments, postID, userID, updateComment, removeComment, currentUser, style }) => {
  const conditionalRender = comments => {
    const renderComments = comments.map(comment => 
    <Comment key={comment.id} 
      id={comment.id}
      currentUser={currentUser}
      updateComment={updateComment}
      removeComment={removeComment}
      content={comment.content} 
      author={comment.author} 
      created={comment.created} 
      updated={comment.updated}
      edited={comment.edited}
      postID={postID}
      userID={comment.user_id}
    />
    )
      if (!comments.length) {
        return null
      } else {
        return renderComments
      }
    }

    return(
        <div className="comment-container" style={{display: style}}>
          <ul className="comment-list" >
            {comments ? conditionalRender(comments) : <Loading />}
          </ul>
        </div>
    )
}

export default CommentList;