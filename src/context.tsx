import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { CommentsData, Comment, User} from './types/types'
import dataJson from "./data.json"


interface DefaultContext{
    currentUser: User;
    comments: Comment[];
    commentToDelete: number;
    modalDisplayOpened: boolean;

}

interface FunctionalContext{
    handleReplyCommentSubmit?: (replyingTo: Comment, comment: string, user: User) => void;
    handleEditComment?: (commentId: number, newComment: string) => void;
    handleCommentAddition?: (newComment: string) => void 
    handleDeleteComment?: (commentId: number) => void
    setCommentToDelete?: Dispatch<SetStateAction<number>>;
    setModalDisplayOpened?: Dispatch<SetStateAction<boolean>>;
}

interface CommentsContextProps{
    children: ReactNode
}

export const CommentsContext = createContext<DefaultContext & FunctionalContext>({
    currentUser: dataJson.currentUser,
    comments: dataJson.comments,
    commentToDelete: 0,
    modalDisplayOpened: false,
})


export function CommentContextProvider({ children }: CommentsContextProps): React.JSX.Element {
    const [data, setData] = useState<CommentsData>(dataJson);
    const [incrementCommentId, setIncrementCommentId] = useState<number>(5)
    const [commentToDelete, setCommentToDelete] = useState<number>(0)
    const [modalDisplayOpened, setModalDisplayOpened] = useState<boolean>(false)
    
    const currentUser = data.currentUser

    const createNewReply = ( comment: string, user: User): Comment => {
        return {
          id: incrementCommentId, // Ensure this is a unique ID
          content: comment,
          createdAt: new Date().toLocaleDateString(),
          score: 0,
          replyingTo: user.username,
          user,
          replies: []
        };
      };

    const fetchCommentByID = (commentId: number, comments: Comment[]):Comment | undefined => {
        for (const comment of comments) {
            if (comment.id === commentId) {
              return comment;
            }

            if (comment.replies === undefined){
                continue
            }
            if (comment.replies.length > 0) {
              const foundReply = fetchCommentByID(commentId, comment.replies);
              if (foundReply) {
                return foundReply;
              }
            }
          }
          return undefined;
    }

    const handleEditComment = (commentId: number, newComment: string): boolean =>{
        setData((prevData) => {
            const currentReplyingToComment = fetchCommentByID(commentId, prevData.comments)
            const initialLen = currentReplyingToComment?.content.length
            if(newComment.startsWith(currentReplyingToComment!.content)){
                currentReplyingToComment!.content = currentReplyingToComment!.content + newComment.substring(initialLen!)
            }
            return prevData
        })
        return false
    }

    const handleCommentAddition = (newComment: string): void => {
        setData((prevData) => ({
            ...prevData,
            comments: [
                ...prevData.comments,
                {
                    id: incrementCommentId,
                    user: prevData.currentUser,
                    content: newComment,
                    createdAt: new Date().toLocaleDateString(),
                    score: 0,
                },
            ],
        }));
        setIncrementCommentId((prevIncrementCommentId) => prevIncrementCommentId + 1);
    };

    function removeCommentById(data: Comment[], id: number) {
        function findAndRemove(comments: Comment[], id: number) {
          for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === id) {
              comments.splice(i, 1);
              return true; // Stop searching after the comment is found and removed
            }
            if (comments[i].replies && comments[i].replies!.length > 0) {
              if (findAndRemove(comments[i].replies!, id)) {
                return true; // Stop searching if the comment in the replies is found and removed
              }
            }
          }
          return false; // Continue searching
        }
      
        findAndRemove(data, id);
      }

    const handleDeleteComment = (commentId: number): void => {
        setData((prevData) => {
            console.log(prevData.comments, '++++');
            const resultantComment = removeCommentById(prevData.comments, commentId);
            console.log(prevData.comments,'====')
            return prevData
        })
    }

    const  handleReplyCommentSubmit = (replyingTo: Comment, comment: string, user: User) => {
        setData((prevData) => {
            const currentReplyingToComment = fetchCommentByID(replyingTo.id, prevData.comments)
            if (!currentReplyingToComment) {
                return prevData
            }
            const newReply = createNewReply( comment, user)
            if(currentReplyingToComment.replies !== undefined){
                currentReplyingToComment.replies.push(newReply)
            }else{
                currentReplyingToComment.replies = []
                currentReplyingToComment.replies.push(newReply)
            }
            
            setIncrementCommentId((prevIncrementCommentId)=> prevIncrementCommentId +1)
            return prevData
        })
        
    }
    
    return (
        <CommentsContext.Provider value={{currentUser,comments:data.comments,
        handleCommentAddition,handleReplyCommentSubmit,handleEditComment,handleDeleteComment, 
        setCommentToDelete, setModalDisplayOpened,commentToDelete, modalDisplayOpened}}>
            {children}
        </CommentsContext.Provider>
    );
}

