import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { CommentsData, Comment, User} from './types/types'
import dataJson from "./data.json"


interface DefaultContext{
    currentUser: User;
    comments: Comment[];
    replyDisplay: boolean;
}

interface FunctionalContext{
    setReplyDisplay?: Dispatch<SetStateAction<boolean>>;
    handleReplyCommentSubmit?: (replyingTo: Comment, comment: string, user: User) => void;
    changeScore?: (newValue: number) => void;
}

interface CommentsContextProps{
    children: ReactNode
}

export const CommentsContext = createContext<DefaultContext & FunctionalContext>({
    currentUser: dataJson.currentUser,
    comments: dataJson.comments,
    replyDisplay: false,
})


export function CommentContextProvider({ children }: CommentsContextProps): React.JSX.Element {
    const [data, setData] = useState<CommentsData>(dataJson);
    const [replyDisplay, setReplyDisplay] = useState<boolean>(false)
    const [incrementCommentId, setIncrementCommentId] = useState<number>(5)
    
    const currentUser = data.currentUser

    const createNewComment = (currentReplyingToComment: Comment, comment: string, user: User): Comment => {
        return {
          id: incrementCommentId, // Ensure this is a unique ID
          content: comment,
          createdAt: "just now",
          score: 0,
          replyingTo: user.username,
          user: {
            image: {
              png: currentUser.image.png,
              webp: currentUser.image.webp
            },
            username: currentUser.username
          },
          replies: []
        };
      };

    const fetchCommentByID = (commentId: number) =>{
        return data.comments.find(comment => comment.id === commentId) ||
        data.comments.flatMap(comment => comment.replies).find(reply => reply?.id === commentId);
    }

    const handleReplyCommentSubmit = (replyingTo: Comment, comment: string, user: User) => {
        setData((prevData) => {
            const currentReplyingToComment = fetchCommentByID(replyingTo.id)
            if (!currentReplyingToComment) {
                return prevData
            }
            const newReply = createNewComment(currentReplyingToComment, comment, user)
            currentReplyingToComment.replies?.push(newReply)
            console.log(incrementCommentId)
            setIncrementCommentId((prevIncrementCommentId)=> prevIncrementCommentId +1)
            console.log(incrementCommentId)
            return prevData
        })
    }
    
    return (
        <CommentsContext.Provider value={{currentUser,comments:data.comments,replyDisplay,setReplyDisplay,handleReplyCommentSubmit}}>
            {children}
        </CommentsContext.Provider>
    );
}

