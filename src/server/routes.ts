/*
 * This file contains the routes for our example REST API. The routes are used to fetch data from the
 * JSON files and return it to the client. You don't need to modify this file, but you can use it to
 * test your filtering and sorting functions. If you wish, you are free to modify this file to suit your needs.
 */

import { Request, Response, Router } from 'express';
import { filterOutDeletedPosts } from '../filtering';
import { mapPostsToUsers } from '../mapping';
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from '../sorting';
import { Post, User, UserWithPosts } from '../types';


/**
 * Here we define a "router" for our server. Often in small examples like this, a router is not used,
 * but it is a good practice and helps us test our routes without starting up a server.
 */
export const router = Router();


/**
 * Route to get all users and their non-deleted posts: /api/v1/user
 */
router.get('/api/v1/user', async (req: Request, res: Response) => {
    const users: User[] = await getUsers();
    const posts: Post[] = await getPosts();

    const usersAndPosts: UserWithPosts[] = mapPostsToUsers(users, posts);

    // Response.json handles the serialization and headers for us:
    res.json(usersAndPosts);
});


/**
 * Route to get a single user and their non-deleted posts by user ID. If the user is not found, a 404 response
 * is sent back to the client. The id of the user is extracted from the URL, for example, /api/v1/user/1.
 */
router.get('/api/v1/user/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    const users: User[] = await getUsers();
    const posts: Post[] = await getPosts();

    // Find user by ID. If user is not found, send a 404 response.
    const user = users.find(u => u.id === userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // Using mapPostsToUsers with a single user is a bit of an overkill, but it's a good way to reuse
    // the code. The function uses arrays instead of single users, so we need to wrap our user and
    // take the first and only element of the result. Feel free to refactor this if you like.
    const userWithPosts: UserWithPosts = mapPostsToUsers([user], posts)[0];

    res.json(userWithPosts);
});



/**
 * This function reads the posts from the `posts.json` file and returns them as an array.
 * Unlike the function in usersAndPosts.ts, this function returns a Promise that resolves
 * to an array of posts. The posts are sorted from oldest to newest and deleted posts are excluded.
 *
 * Returning a promise makes the function asynchronous, which makes it appear more like a real-world
 * scenario where data is fetched from a database or an external API.
 */
async function getPosts(): Promise<Post[]> {
    let posts = require('../../data/posts.json') as Post[];
    posts = filterOutDeletedPosts(posts);
    posts = sortPostsByPublishedDate(posts);
    return posts;
}


/**
 * This function reads the users from the `users.json` file and returns them as an array.
 * See the getPosts function above for an explanation of why this function returns a Promise.
 */
async function getUsers(): Promise<User[]> {
    let users = require('../../data/users.json') as User[];
    users = sortUsersByRegistrationDate(users);
    return users;
}
