import { type Post, type User } from "./types.ts";


/**
 * Returns an array of posts that do not have a 'deletedAt' timestamp. The original array is not modified.
 */
export function excludeDeletedPosts(posts: Post[]): Post[] {
    // TODO: Implement filtering logic to exclude posts that have a 'deletedAt' timestamp.

    return posts.filter(post => true); // FIXME: this should not return all posts
}

/**
 * Returns a new array of posts that belong to the given user. The original array is not modified.
 */
export function selectPostsByUser(posts: Post[], user: User): Post[] {
    // FIXME: Implement filtering logic to select posts that belong to the given user.
    return posts;
}
