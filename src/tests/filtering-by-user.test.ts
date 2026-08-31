import { describe, expect, test } from 'vitest';
import { selectPostsByUser } from '../filtering.ts';
import type { Post, User } from '../types.ts';


describe('filtering by user', () => {
    // the "as" keyword is used to assert that the object conforms to the User type,
    // even though we are only providing a subset of the properties.
    const user1 = { id: 1, firstName: 'User 1' } as User;

    const post1 = { id: 1, userId: 1, title: 'Post 1 by user 1' } as Post;
    const post2 = { id: 2, userId: 1, title: 'Post 2 by user 1' } as Post;
    const post3 = { id: 3, userId: 2, title: 'Post 3 by user 2' } as Post;

    test('posts belonging to the given user are included in the result', () => {
        const posts = [post1, post2, post3];
        let filtered = selectPostsByUser(posts, user1);

        expect(filtered).toEqual([post1, post2]);
    });

    test('the function does not modify the original array', () => {
        const original = [post1, post2, post3];
        let filtered = selectPostsByUser(original, user1);

        // the original array must remain unchanged
        expect(original).not.toEqual(filtered);
        expect(original).toEqual([post1, post2, post3]);
    });
});
