export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    ip: string;
    ssn: string;
    userAgent: string;
}
