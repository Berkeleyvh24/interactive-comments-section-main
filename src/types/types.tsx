export interface Comment {
    id: number;
    user: User;
    content: string;
    createdAt: string;
    score: number;
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