/*
 * You do not need to modify this file. You can run it with `npm start` and see the output in the console.
 * Initially, the output is not sorted or filtered. Your task is to implement the functions in the other files.
 * See the readme.md for more information.
 */

import { readFile } from "fs/promises";
import { filterOutDeletedPosts } from "./filtering.js";
import { mapPostsToUsers } from "./mapping.js";
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from "./sorting.js";
import { Post, User, UserWithPosts } from "./types.js";

/**
 * Reads posts from the `posts.json` file and returns them as an array.
 * The posts are sorted from oldest to newest and deleted posts are excluded.
 */
async function getPosts(): Promise<Post[]> {

    const postsFile = new URL('../data/posts.json', import.meta.url);
    const posts: Post[] = JSON.parse(await readFile(postsFile, 'utf8'));

    // exclude posts that are marked as deleted:
    const activePosts = filterOutDeletedPosts(posts);

    // active posts are sorted from oldest to newest:
    return sortPostsByPublishedDate(activePosts);
}

/**
 * Reads users from the `users.json` file and returns them as an array.
 * The users are sorted from oldest to newest by registration date.
 */
async function getUsers(): Promise<User[]> {
    const usersFile = new URL('../data/users.json', import.meta.url);
    const users: User[] = JSON.parse(await readFile(usersFile, 'utf8'));

    // users are sorted in ascending order by registration date
    return sortUsersByRegistrationDate(users);
}


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
