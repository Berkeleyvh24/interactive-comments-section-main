export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies?: Comment[];
    replyingTo?: string;
      
}

export interface User {
    image: Image;
    username: string;
}

export interface CommentsData {
    currentUser: User;
    comments: Comment[];
}

interface Image {
    png: string;
    webp: string;
}