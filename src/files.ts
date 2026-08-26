/*
 * You do not need to modify this file. It provides functions to read users and posts from
 * JSON files and return it to the caller. Your task is to implement filtering and sorting
 * functions in the other files. See the readme.md for more information.
 */

import { readFile } from "fs/promises";
import { type Post, type User } from "./types.ts";

// Relative paths to the JSON files containing the data:
const postsFile = new URL('../data/posts.json', import.meta.url);
const usersFile = new URL('../data/users.json', import.meta.url);

/**
 * Reads posts from the `posts.json` file and returns them as an array.
 * The posts are sorted from oldest to newest and deleted posts are excluded.
 */
export async function getPosts(): Promise<Post[]> {
    const posts: Post[] = JSON.parse(await readFile(postsFile, 'utf8'));

    return posts;
}

/**
 * Reads users from the `users.json` file and returns them as an array.
 * The users are sorted from oldest to newest by registration date.
 */
export async function getUsers(): Promise<User[]> {
    const users: User[] = JSON.parse(await readFile(usersFile, 'utf8'));

    return users;
}
