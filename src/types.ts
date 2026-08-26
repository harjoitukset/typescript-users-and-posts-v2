/**
 * The basic Post type with publishedAt and deletedAt timestamps.
 * The deletedAt timestamp is optional, and if it is present, the post is considered deleted.
 */
export type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;

    /** Time of publishing in ISO format, for example "2023-04-10T09:45:00Z" */
    publishedAt: string;

    /** Optional time of deletion in ISO format, for example "2023-04-10T09:45:00Z" */
    deletedAt?: string;
};


/**
 * The User type represents a user in the system with various attributes.
 * The 'registeredAt' property can be either a number (epoch timestamp in seconds)
 * or a string (ISO format) depending on how the user registered.
 */
export type User = {
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

    /**
     * "Users who registered through our mobile app have an integer value representing the epoch
     * timestamp in seconds, while users who registered through the web app have a string in ISO format."
     */
    registeredAt: number | string;
};


/**
 * Represents a user with associated posts.
 * This union type combines attributes from the 'User' class with an array of 'Post' objects.
 * It is used to represent users along with their posts.
 */
export type UserWithPosts = User & { posts: Post[] };
