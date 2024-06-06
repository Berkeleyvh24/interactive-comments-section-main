import * as React from "react";
import "./comment.css";
import { Comment } from "../types/types";
import { CommentsContext } from "../context.tsx";
import { useContext, useState } from "react";

interface CommentComponentInterface {
  comment: Comment;
}

export default function CommentComponent({
  comment,
}: CommentComponentInterface) {
  const [count, setCount] = useState(comment.score);
  const [showReply, setShowReply] = useState(false);

  const incrementScore = (): void => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };
  const decrementScore = (): void => {
    setCount((prevCount) => {
      return prevCount - 1;
    });
  };
  const tappedReply = (): void => {
    console.log("tapped reply");
    if(showReply){
        setShowReply(false);
        return;
    }
    setShowReply(true);
  };

  return (
    <div>
      <div className="comment-container">
        <div className="upvote-container">
          <button>
            <img
              src={"./images/icon-plus.svg"}
              onClick={incrementScore}
              alt="plus"
            />
          </button>
          <span>{count}</span>
          <button>
            <img
              src={"./images/icon-minus.svg"}
              onClick={decrementScore}
              alt="minus"
            />
          </button>
        </div>
        <div className="inner-comment-container">
          <div className="inner-comment-tags">
            <img src={comment.user.image.png} alt="profile-pic" />
            <div className="inner-comment-tags-text">
              <span>{comment.user.username}</span>
              <span>{comment.createdAt}</span>
            </div>
            <a className="inner-comment-tags-reply" onClick={tappedReply}>
              <img src={"./images/icon-reply.svg"} alt="report" />
              <p>Reply</p>
            </a>
          </div>
          <div className="inner-comment-text">
            <span>
              {}
              {comment.content}
            </span>
          </div>
        </div>
      </div>
      {showReply ? (<div className="create-reply-container">
        
      </div>) : (<div></div>)}
    </div>
  );
}
