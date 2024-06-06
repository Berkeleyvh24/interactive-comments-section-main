import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Comment, User} from './types/types'
import data from "./data.json"


interface DefaultContext{
    currentUser: User;
    comments: Comment[];
    replyDisplay: boolean;
}

interface FunctionalContext{
    setReplyDisplay?: Dispatch<SetStateAction<boolean>>;
    changeScore?: (newValue: number) => void;
}

interface CommentsContextProps{
    children: ReactNode
}

export const CommentsContext = createContext<DefaultContext & FunctionalContext>({
    currentUser: data.currentUser,
    comments: data.comments,
    replyDisplay: false,
})


export function CommentContextProvider({ children }: CommentsContextProps): React.JSX.Element {
    const currentUser = data.currentUser;
    const comments = data.comments;
    const [replyDisplay, setReplyDisplay] = useState<boolean>(false)

    function changeScore(){

    }
    
    return (
        <CommentsContext.Provider value={{currentUser,comments,changeScore,replyDisplay,setReplyDisplay}}>
            {children}
        </CommentsContext.Provider>
    );
}

