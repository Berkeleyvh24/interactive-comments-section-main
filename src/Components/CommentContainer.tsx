import "./commentContainer.css";
import CommentComponent from "./Comment.tsx";
import { Comment } from "../types/types";
import { CommentsContext } from "../context.tsx";
import { useContext } from "react";

interface CommentContainerInterface {
  comment: Comment;
  key: number;
}

export default function CommentsContainer({
  comment,
}: CommentContainerInterface) {
  const { currentUser } = useContext(CommentsContext);

  return (
      <div className="comment-reply-container">
        <CommentComponent activeUserName={currentUser.username} comment={comment} />
      </div>
  );
}
