import { describe, expect, test } from 'vitest';
import { excludeDeletedPosts, selectPostsByUser } from '../filtering.ts';
import type { Post, User } from '../types.ts';


describe('filtering active posts', () => {
    // the following posts only contain minimal properties for the purpose of testing filtering logic:
    const active2027 = { id: 1, title: "Active post 2027", publishedAt: "2027-02-02T02:02:02Z" } as Post;
    const active2028 = { id: 2, title: "Active post 2028", publishedAt: "2028-03-03T03:03:03Z" } as Post;
    const deleted2027 = { id: 3, title: "Deleted post 2027", publishedAt: "2027-02-02T02:02:02Z", deletedAt: "2027-02-03T02:02:02Z" } as Post;
    const deleted2028 = { id: 4, title: "Deleted post 2028", publishedAt: "2028-02-02T02:02:02Z", deletedAt: "2028-02-03T02:02:02Z" } as Post;

    test('active posts are included in the result', () => {
        let filtered = excludeDeletedPosts([active2027, active2028]);
        expect(filtered).toEqual([active2027, active2028]);
    });

    test('posts marked as deleted are excluded from the result', () => {
        let filtered = excludeDeletedPosts([deleted2027, deleted2028]);
        expect(filtered).toEqual([]);
    });

    test('deleted posts are removed from the beginning, end and between active articles', () => {
        let original = [deleted2027, active2027, deleted2027, active2028, deleted2028];
        let filtered = excludeDeletedPosts(original);

        expect(filtered).toEqual([active2027, active2028]);
    });

    test('the function does not modify the original array', () => {
        let original = [active2027, deleted2027, active2028, deleted2028];
        let filtered = excludeDeletedPosts(original);

        // the original array must remain unchanged
        expect(original).not.toEqual(filtered);
        expect(original).toEqual([active2027, deleted2027, active2028, deleted2028]);
    });
});

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
