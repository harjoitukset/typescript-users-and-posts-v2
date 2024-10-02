import express, { Request, Response } from 'express';
import { filterOutDeletedPosts } from '../filtering';
import { mapPostsToUsers } from '../mapping';
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from '../sorting';
import { Post, User, UserWithPosts } from '../types';


/**
 * This function reads the posts from the `posts.json` file and returns them as an array.
 * Unlike the original function, this function returns a Promise that resolves to an array of posts.
 * The posts are sorted from oldest to newest and deleted posts are excluded.
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

/**
 * The Express app object is created here and exported. Exporting the app object allows it to be used
 * in the server/index.ts file to start the server and also in the test files to test the routes, without
 * the server being started.
 */
export const app = express();
app.set('json spaces', 4); // Pretty-print JSON responses

/**
 * Route to get all users and their non-deleted posts: /api/v1/user
 */
app.get('/api/v1/user', async (req: Request, res: Response) => {
    const users: User[] = await getUsers();
    const posts: Post[] = await getPosts();

    const usersAndPosts: UserWithPosts[] = mapPostsToUsers(users, posts);
    res.json(usersAndPosts);
});


/**
 * Route to get a single user and their non-deleted posts by user ID. If the user is not found, a 404 response
 * is sent back to the client. The id of the user is extracted from the URL, for example, /api/v1/user/1.
 */
app.get('/api/v1/user/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    const users: User[] = await getUsers();
    const posts: Post[] = await getPosts();

    // Find user by ID. If user is not found, send a 404 response.
    const user = users.find(u => u.id === userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    /*
     * This part of the code utilizes the mapPostsToUsers function to map the posts to the user, although
     * there is only one user in this case. Therefore, we need to wrap the user object in an array and extract
     * the first element of the resulting array to get the UserWithPosts object, which might not be the most
     * intuitive way to handle this situation. You are allowed to refactor this part of the code to make it more
     * readable and maintainable.
     */
    const userWithPosts: UserWithPosts = mapPostsToUsers([user], posts)[0];

    res.json(userWithPosts);
});

