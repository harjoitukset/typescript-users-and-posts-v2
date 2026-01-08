import { describe, expect, test } from 'vitest';
import { filterOutDeletedPosts } from '../filtering';
import { Post } from '../types';

/**
 * This helper function creates a test post with a given `publishedAt` and `deletedAt` time.
 * Other attributes are not relevant when testing the filtering function.
 */
function createTestPost(publishedAt: string, deletedAt?: string): Post {
    // The functions under test are not allowed to modify the data.
    // Therefore, we use Object.freeze to make the object immutable.
    return Object.freeze({
        "id": Math.trunc(Math.random() * 10_000),
        "title": deletedAt ? "Deleted post" : "Active post",
        "body": "",
        "userId": 0,
        "tags": [],
        "reactions": 0,
        "publishedAt": publishedAt,
        "deletedAt": deletedAt
    });
}


describe('filtering posts', () => {
    const active2027 = createTestPost("2027-02-02T02:02:02Z");
    const active2028 = createTestPost("2028-03-03T03:03:03Z");
    const deleted2027 = createTestPost("2027-02-02T02:02:02Z", "2027-02-03T02:02:02Z");
    const deleted2028 = createTestPost("2028-02-02T02:02:02Z", "2028-02-03T02:02:02Z");

    test('active posts are included in the result', () => {
        let filtered = filterOutDeletedPosts([active2027, active2028]);
        expect(filtered).toEqual([active2027, active2028]);
    });

    test('posts marked as deleted are excluded from the result', () => {
        let filtered = filterOutDeletedPosts([deleted2027, deleted2028]);
        expect(filtered).toEqual([]);
    });

    test('deleted posts are removed from the beginning, end and between active articles', () => {
        let original = [deleted2027, active2027, deleted2027, active2028, deleted2028];
        let filtered = filterOutDeletedPosts(original);

        expect(filtered).toEqual([active2027, active2028]);
    });

    test('the function does not modify the original array', () => {
        let original = [active2027, deleted2027, active2028, deleted2028];
        let filtered = filterOutDeletedPosts(original);

        // the original array must remain unchanged
        expect(original).toEqual([active2027, deleted2027, active2028, deleted2028]);
    });
});
