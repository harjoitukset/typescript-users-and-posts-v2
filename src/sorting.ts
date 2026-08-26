import { type Post, type User } from "./types.ts";

/**
 * Sorts an array of posts in ascending order based on the 'publishedAt' date. The
 * original array is not modified. Instead, a new array is returned.
 *
 * @param posts The array of post objects to be sorted.
 * @returns A new array with the posts sorted by publishedAt time.
 */
export function sortPostsByPublishedDate(posts: Post[]): Post[] {
    return quickSort(posts);
}

function quickSort(posts: Post[]): Post[] {
    if (posts.length <= 1) {
        return posts;
    }
    const pivot = posts[posts.length - 1];
    const left: Post[] = [];
    const right: Post[] = [];

    for (let i = 0; i < posts.length - 1; i++) {
        if (new Date(posts[i].publishedAt) < new Date(pivot.publishedAt)) {
            left.push(posts[i]);
        } else {
            right.push(posts[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

/**
 * Sorts an array of user objects in ascending order based on the 'registeredAt' date.
 * Handles different data types for 'registeredAt': integer (seconds) and string (iso).
 *
 * @param users The array of user objects to be sorted.
 * @returns New array of users sorted by `registeredAt` timestamps.
 */
export function sortUsersByRegistrationDate(users: User[]): User[] {
    // TODO: Implement sorting logic. This time you are allowed to use the existing `sort` method.

    // NOTE! The users' timestamps are presented in Unix time, which counts seconds since epoch.
    // JavaScript Dates use milliseconds instead of seconds. See https://stackoverflow.com/a/221297 for more info.
    return sortUsers([...users]);
}


function sortUsers(users: User[]): User[] {
    const registerTime = (u: User) => (typeof u.registeredAt === 'number') ? u.registeredAt * 1000 : new Date(u.registeredAt).getTime();

    return users.sort((u1, u2) => {
        return registerTime(u1) - registerTime(u2);
    });
}
