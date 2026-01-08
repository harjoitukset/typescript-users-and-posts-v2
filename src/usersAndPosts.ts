/*
 * You do not need to modify this file. You can run it with `npm start` and see the output in the console.
 * Initially, the output is not sorted or filtered. Your task is to implement the functions in the other files.
 * See the readme.md for more information.
 */
import { getPosts, getUsers } from "./files.js";
import { mapPostsToUsers } from "./mapping.js";
import { type Post, type User, type UserWithPosts } from "./types.js";


/**
 * Reads the users and posts from the JSON files and prints them to the console.
 * Each user is printed along with their own posts.
 */
async function printUsersAndPosts() {
    const users: User[] = await getUsers();
    const posts: Post[] = await getPosts();

    // posts are combined to users in a testable and reusable way
    let usersAndPosts: UserWithPosts[] = mapPostsToUsers(users, posts);

    usersAndPosts.forEach(user => {
        console.log(`# ${user.firstName} ${user.lastName} (${user.registeredAt})`);

        user.posts.forEach(p => {
            console.log(` - ${p.title}`);
            console.log(`   ${p.publishedAt} ${p.deletedAt ?? ''}`)
        });

        console.log(); // empty line between each user
    });
}

printUsersAndPosts();
