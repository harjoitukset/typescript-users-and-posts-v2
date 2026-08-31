import { describe, expect, test } from 'vitest';
import { excludeDeletedPosts } from '../filtering.ts';
import type { Post } from '../types.ts';


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
