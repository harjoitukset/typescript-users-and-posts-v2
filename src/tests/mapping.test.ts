import { describe, expect, test } from 'vitest';
import { mapPostsToUsers } from '../mapping';
import { Post, User } from '../types';



describe('mapUsersWithPosts', () => {
    const users = [
        { id: 1, firstName: 'User 1' }, // has 2 posts
        { id: 2, firstName: 'User 2' }, // has 1 post
        { id: 3, firstName: 'User 3' }  // has no posts
    ] as User[];

    const posts = [
        { id: 1, userId: 1, title: 'Post 1 by user 1' },
        { id: 2, userId: 1, title: 'Post 2 by user 1' },
        { id: 3, userId: 2, title: 'Post 3 by user 2' }
    ] as Post[];

    test('posts are mapped with users correctly', () => {

        const usersWithPosts = mapPostsToUsers(users, posts);

        expect(usersWithPosts.length).toBe(3);
        expect(usersWithPosts[0].posts.length).toBe(2);
        expect(usersWithPosts[1].posts.length).toBe(1);
        expect(usersWithPosts[2].posts.length).toBe(0);

        expect(usersWithPosts[0].posts[0].title).toBe('Post 1 by user 1');
        expect(usersWithPosts[0].posts[1].title).toBe('Post 2 by user 1');
        expect(usersWithPosts[1].posts[0].title).toBe('Post 3 by user 2');
    });

    test('function does not modify given users', () => {
        const usersWithPosts = mapPostsToUsers(users, posts);

        // the original users should not have a 'posts' property
        expect(users[0]).not.toHaveProperty('posts');
    });

    test('empty input arrays are handled without errors', () => {
        const users: User[] = [];
        const posts: Post[] = [];

        const usersWithPosts = mapPostsToUsers(users, posts);

        expect(usersWithPosts.length).toBe(0);
    });
});
