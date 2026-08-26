/*
 * This file contains the routes for our example REST API. The routes are used to fetch data from the
 * JSON files and return it to the client. You don't need to modify this file, but you can use it to
 * test your filtering and sorting functions. If you wish, you are free to modify this file to suit your needs.
 */
import { type Request, type Response, Router } from 'express';
import { getPosts, getUsers } from '../files.ts';
import { excludeDeletedPosts, selectPostsByUser } from '../filtering.ts';
import { mapPostsToUsers } from '../mapping.ts';
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from '../sorting.ts';
import { type UserWithPosts } from '../types.ts';

/**
 * A router for defining the paths and their handlers.
 */
export const router = Router();


/**
 * Route to get all users and their non-deleted posts: /api/v1/user
 */
router.get('/api/v1/user', async (req: Request, res: Response) => {
    const { users, posts } = await loadUsersAndActivePosts();
    const usersAndPosts: UserWithPosts[] = mapPostsToUsers(users, posts);

    // Response.json handles the serialization and http headers for us:
    res.json(usersAndPosts);
});


/**
 * Route to get a single user and their non-deleted posts by user ID. If the user is not found, a 404 response
 * is sent back to the client. The id of the user is extracted from the URL, for example, /api/v1/user/1.
 */
router.get('/api/v1/user/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id as string);
    const { users, posts } = await loadUsersAndActivePosts();

    // Find user by ID. If user is not found, send a 404 response.
    const user = users.find(u => u.id === userId);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.json({
        ...user,
        posts: selectPostsByUser(posts, user)
    });
});


/**
 * Utility function for loading users and active posts. Reduces the need to fetch,
 * filter and sort in multiple routes. In real life applications we would not be
 * loading all data on every request, but for this example it is acceptable.
 */
async function loadUsersAndActivePosts() {
    const [allUsers, allPosts] = await Promise.all([getUsers(), getPosts()]);

    return {
        users: sortUsersByRegistrationDate(allUsers),
        posts: sortPostsByPublishedDate(excludeDeletedPosts(allPosts))
    };
}
