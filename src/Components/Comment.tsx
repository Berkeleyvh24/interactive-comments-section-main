import * as React from "react";
import "./comment.css";
import { Comment } from "../types/types";
import { useContext, useState } from "react";
import AddComment from "./addComment.tsx";
import { CommentsContext } from "../context.tsx";

interface CommentComponentInterface {
  comment: Comment;
  activeUserName: string;
}

export default function CommentComponent({
  comment,
  activeUserName,
}: CommentComponentInterface) {
  const { handleEditComment, setCommentToDelete, setModalDisplayOpened} = useContext(CommentsContext);
  const [count, setCount] = useState(comment.score);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [editText, setEditText] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(comment.content);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const editTextChange = (): void => {
    if (!editText) {
      setEditText(true);
      return;
    }

    setEditText(false);
  };

  const replyButtonChange = (): void => {
    if (isHidden) {
      setIsHidden(false);
      return;
    }
    setIsHidden(true);
  };

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

  function handleEditUpdate(): void {
    const returnBoolean = handleEditComment!(comment.id, inputValue);
    setEditText(returnBoolean!);
  }

  const deleteCommentWithId = (): void => {
    console.log('yooo')
    setCommentToDelete!(comment.id)
    setModalDisplayOpened!(true)
  }

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
              {activeUserName === comment.user.username ? (
                <span>you</span>
              ) : (
                <span>notu</span>
              )}
              <span>{comment.createdAt}</span>
            </div>
            {activeUserName === comment.user.username ? (
              <div className="inner-comment-edit-delete">
                <a
                  className="inner-comment-tags-reply"
                  onClick={deleteCommentWithId}
                >
                  <img src={"./images/icon-delete.svg"} alt="report" />
                  <p>Delete</p>
                </a>
                <a
                  className="inner-comment-tags-reply"
                  onClick={editTextChange}
                >
                  <img src={"./images/icon-edit.svg"} alt="report" />
                  <p>Edit</p>
                </a>
              </div>
            ) : (
              <></>
            )}
            {!editText && (
              <a
                className="inner-comment-tags-reply"
                onClick={replyButtonChange}
              >
                <img src={"./images/icon-reply.svg"} alt="report" />
                <p>Reply</p>
              </a>
            )}
          </div>
          {editText ? (
            <div className="inner-edit">
              <div className="inner-comment-text">
                <textarea
                  rows={5}
                  value={inputValue}
                  className="create-edit-input"
                  onChange={handleInputChange}
                  placeholder="Enter some text"
                />
              </div>
              <div className="inner-edit-update-container">
                <button
                  className="inner-edit-update-button"
                  onClick={handleEditUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div className="inner-comment-text">
              <span>{comment.content}</span>
            </div>
          )}
        </div>
      </div>
      {!isHidden && <AddComment comment={comment} setIsHidden={setIsHidden} />}
      <div className="inner-reply-container">
        <div className="inner-reply-bar"></div>
        <div className="inner-reply-comment-section">
          {comment!.replies !== undefined && comment!.replies.length > 0 && (
            <>
              {comment.replies?.map((reply, index) => (
                <CommentComponent
                  activeUserName={activeUserName}
                  key={index}
                  comment={reply}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
