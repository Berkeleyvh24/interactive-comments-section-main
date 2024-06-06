import * as React from 'react';
import './commentContainer.css'
import CommentComponent from './Comment.tsx'
import { useContext } from 'react';
import { CommentsContext } from '../context.tsx';


export default function CommentsContainer () {

  const {comments: dataComments} = useContext(CommentsContext)
  
  return (
    <div className="main-container">
          {dataComments.map((comment) => (
          <>
          <div className='comment-reply-container'>
      
                <CommentComponent comment={comment}/>
                    
      
                {(comment.replies ?? []).map((reply) => (
                <div className='inner-reply-container'>
      
                  <div className='inner-reply-bar'></div>
                  <div className='inner-reply-comment-section'>
                    <CommentComponent comment={reply} />
      
                  </div>
                </div>
                
                ))}
          </div>
          </>
        ))}
      </div>
    
    
  );
}
