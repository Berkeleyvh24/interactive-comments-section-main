import * as React from "react";
import "./comment.css";
import { Comment } from "../types/types";
import { useState } from "react";
import AddComment from "./addComment.tsx";

interface CommentComponentInterface {
  comment: Comment;
}

export default function CommentComponent({
  comment,
}: CommentComponentInterface) {
  const [count, setCount] = useState(comment.score);
  const [isHidden, setIsHidden] = useState<boolean>(true);


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
            <a className="inner-comment-tags-reply" onClick={() => setIsHidden(false)}>
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
      {!isHidden && <AddComment comment={comment} setIsHidden={setIsHidden}/>}
      {comment!.replies !== undefined && comment!.replies.length > 0 && (
      <div>
            {comment.replies?.map((reply, index) => (
              <div>
                <div className="inner-reply-container">
                  <div className="inner-reply-bar"></div>
                  <div className="inner-reply-comment-section">
                    <CommentComponent key={index} comment={reply} />
                  </div>
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
}
