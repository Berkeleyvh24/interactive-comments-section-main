import * as React from "react";
import "./commentContainer.css";
import CommentComponent from "./Comment.tsx";
import { Comment } from "../types/types";

interface CommentContainerInterface {
  comment?: Comment;
  key: number;
}

export default function CommentsContainer({
  comment,
}: CommentContainerInterface) {
  return (
    <div className="main-container">
      <div className="comment-reply-container">
        <CommentComponent comment={comment!} />

        {/* {comment!.replies !== undefined && comment!.replies.length > 0 && (
          <div>
            {comment?.replies.map((reply, index) => (
              <div>
                <div className="inner-reply-container">
                  <div className="inner-reply-bar"></div>
                  <div className="inner-reply-comment-section">
                    <CommentsContainer key={index+1} comment={reply} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} */}
        {/* {(comment.replies ?? []).map((reply) => (
                
                
                ))} */}
      </div>
    </div>
  );
}
