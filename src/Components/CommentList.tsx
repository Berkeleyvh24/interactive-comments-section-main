import { useContext } from "react";
import { CommentsContext } from "../context.tsx";
import CommentsContainer from '../Components/CommentContainer.tsx'

export default function CommentList() {
    const { comments: dataComments } = useContext(CommentsContext)
    return (
      <div>
        {dataComments?.map((comment, index) => (
          <CommentsContainer key={index} comment={comment}/>
        ))}
      </div>
    )
  } 