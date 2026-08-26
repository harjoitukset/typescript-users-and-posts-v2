import { type Post, type User, type UserWithPosts } from "./types.ts";

/**
 * Maps posts to users and creates UserWithPosts objects.
 * @param users The array of user objects.
 * @param posts The array of post objects.
 * @returns The array of UserWithPosts objects.
 */
export function mapPostsToUsers(users: User[], posts: Post[]): UserWithPosts[] {

    return users.map(user => {
        return {
            ...user,

            // FIXME! This just takes the first posts for each user.
            // You need to filter the posts for each user based on the userId.
            posts: posts.slice(0, 5)
        }
    });
}
