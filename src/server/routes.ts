/*
 * This file contains the routes for our example REST API. The routes are used to fetch data from the
 * JSON files and return it to the client. You don't need to modify this file, but you can use it to
 * test your filtering and sorting functions. If you wish, you are free to modify this file to suit your needs.
 */

import { Request, Response, Router } from 'express';
import { getPosts, getUsers } from '../files.js';
import { mapPostsToUsers } from '../mapping.js';
import { type Post, type User, type UserWithPosts } from '../types.js';


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
