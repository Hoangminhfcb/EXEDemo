export interface User {
    name: string;
    avatar: string;
    title: string;
}

export interface Reply {
    id: string;
    user: User;
    content: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    userName: string;
    content: string;
    createdAt: string;
    replies?: Reply[];
}

export interface Review {
    id: number;
    user: User;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
    replies?: Reply[];
}

export interface Note {
    id: string;
    content: string;
    timestamp: string;
}

export interface Lesson {
    lessonId: string;
    lessonName: string;
    lessonDescription: string;
    linkVideoLesson: string;
}

export interface Chapter {
    chapterId: string;
    name: string;
    description?: string;
    lessons: Lesson[];
}

export interface Course {
    courseId: string;
    name: string;
    description: string;
    courseCover: string;
    price: number;
    categoryName: string;
    createdAt: string;
    chapters: Chapter[];
    reviews?: Review[];
}