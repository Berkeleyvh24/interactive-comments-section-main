import { useContext, useState } from "react";
import { CommentsContext } from "../context.tsx";
import * as React from "react";
import { Comment } from "../types/types.tsx";
import "./addComment.css";

interface AddCommentComponentType {
  comment: Comment;
  setIsHidden: (isHidden: boolean) => void;
}

const AddComment = ({ comment, setIsHidden}: AddCommentComponentType) => {
  const { handleReplyCommentSubmit, currentUser} = useContext(CommentsContext);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    handleReplyCommentSubmit!(comment, inputValue, currentUser);
    setIsHidden(true);
    setInputValue("");
  };

  return (
    <div className="create-reply-container">
      <img src={currentUser.image.png} alt="profile-pic" />
      <textarea
        value={inputValue}
        className="create-reply-input"
        onChange={handleInputChange}
        placeholder="Enter some text"
      />
      <button disabled={inputValue.length === 0} className="create-reply-button" onClick={handleButtonClick}>
        Submit
      </button>
    </div>
  );
};

export default AddComment;
