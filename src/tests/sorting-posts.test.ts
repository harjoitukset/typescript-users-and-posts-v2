import { afterEach, describe, expect, test, vitest } from 'vitest';
import { sortPostsByPublishedDate } from '../sorting.js';
import { Post } from '../types.js';


describe('sorting posts by publishedAt', () => {
    const first: Post = { publishedAt: '2022-01-01T08:07:20.410Z', title: 'Posted in January 2022' } as Post;
    const second: Post = { publishedAt: '2023-01-01T08:07:20.410Z', title: 'Posted in January 2023' } as Post;
    const third: Post = { publishedAt: '2023-12-01T08:07:20.410Z', title: 'Posted in December 2023' } as Post;

    const unordered = [third, first, second];

    afterEach(() => {
        // reset mocks to restore original behaviour of Array.sort
        vitest.resetAllMocks();
    });

    test('post are returned in correct order', () => {
        let sorted = sortPostsByPublishedDate(unordered);

        expect(sorted).toEqual([first, second, third]);
    });

    test('sorting handles posts with identical dates correctly', () => {
        let samePostsTwice = [...unordered, ...unordered];
        let sorted = sortPostsByPublishedDate(samePostsTwice);

        expect(sorted).toEqual([first, first, second, second, third, third]);
    });

    test('sorting an empty array should not throw exceptions', () => {
        let sorted = sortPostsByPublishedDate([]);

        expect(sorted).toEqual([]);
    });

    test('sorting should not modify the original array', () => {
        sortPostsByPublishedDate(unordered);

        expect(unordered).toEqual([third, first, second]);
    });

    test('sorting posts must not utilize Array.sort', () => {
        // this function will replace `Array.sort` and throw an exception if called:
        let notAllowed = (compareFn?: ((a: any, b: any) => number)): any[] => {
            throw new Error('Using Array.sort is not allowed in the exercise!');
        };

        const sort = vitest.spyOn(Array.prototype, 'sort').mockImplementation(notAllowed);
        const toSorted = vitest.spyOn(Array.prototype, 'toSorted').mockImplementation(notAllowed);

        // will throw an error if the sorting methods are used inside the function
        sortPostsByPublishedDate(unordered);

        // if Array.sort and Array.toSorted were not called, the test will pass
        expect(sort).toHaveBeenCalledTimes(0);
        expect(toSorted).toHaveBeenCalledTimes(0);
    });
});
