import { describe, expect, test } from 'vitest';
import { getPosts, getUsers } from '../files.ts';

/**
 * In this exercise, reading the JSON files is already implemented for you.
 * The following tests are provided to ensure that the reading of the files
 * works correctly, and you should not need to modify or debug these tests
 * or the tested functions.
 */
describe('Reading the JSON files', () => {

    test('getUsers() returns an array of users', async () => {
        const users = await getUsers();

        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBe(100);

        // check that each user has the expected properties
        users.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('firstName');
            expect(user).toHaveProperty('lastName');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('registeredAt');
        });
    });

    test('getPosts() returns an array of posts', async () => {
        const posts = await getPosts();

        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBe(150);

        // check that each post has the expected properties
        posts.forEach(post => {
            expect(post).toHaveProperty('id');
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('body');
            expect(post).toHaveProperty('userId');
            expect(post).toHaveProperty('tags');
            expect(post).toHaveProperty('reactions');
            expect(post).toHaveProperty('publishedAt');
        });
    });
});
