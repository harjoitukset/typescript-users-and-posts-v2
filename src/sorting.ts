import { Post, User } from "./types";

/**
 * Sorts an array of posts in ascending order based on the 'publishedAt' date. The
 * original array is not modified. Instead, a new array is returned.
 *
 * @param posts The array of post objects to be sorted.
 * @returns A new array with the posts sorted by publishedAt time.
 */
function sortPostsByPublishedDate(posts: Post[]): Post[] {
    // TODO: Implement manual sorting logic here.
    // The existing `sort` method must not be used!
    // See bubble sort, insertion sort, quicksort or others.
    return [...posts];
}

/**
 * Sorts an array of user objects in ascending order based on the 'registeredAt' date.
 * Handles different data types for 'registeredAt' (integer and string).
 *
 * @param users The array of user objects to be sorted.
 * @returns New array of users sorted by `registeredAt` timestamps.
 */
function sortUsersByRegistrationDate(users: User[]): User[] {
    // TODO: Implement sorting logic. This time you are
    // allowed to use the existing `sort` method.
    return [...users];
}