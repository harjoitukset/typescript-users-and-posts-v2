import { type Post, type User } from "./types.ts";


/**
 * Returns an array of posts that do not have a 'deletedAt' timestamp. The original array is not modified.
 */
export function excludeDeletedPosts(posts: Post[]): Post[] {

    return posts.filter(post => !post.deletedAt);
}

/**
 * Returns a new array of posts that belong to the given user. The original array is not modified.
 */
export function selectPostsByUser(posts: Post[], user: User): Post[] {

    return posts.filter(post => post.userId === user.id);
}
