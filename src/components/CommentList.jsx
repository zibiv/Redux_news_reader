import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments }) {
  if (!comments) {
    return null;
  }
  
  return (
    <ul className='comments-list'>
      {comments.map( (comment, id) => {
        return <Comment key={id} comment={comment}/>;
      })}
    </ul>
  );
}
