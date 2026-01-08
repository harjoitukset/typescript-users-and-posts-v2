import { describe, expect, test } from 'vitest';
import { sortUsersByRegistrationDate } from '../sorting';
import { User } from '../types';


describe('sorting users by registration date', () => {
    const string2027: User = { firstName: 'Jim', registeredAt: '2027-06-01T08:07:20.410Z' } as User;
    const string2029: User = { firstName: 'Pam', registeredAt: '2029-06-01T08:07:20.410Z' } as User;
    const string2031: User = { firstName: 'Michael', registeredAt: '2031-06-01T08:07:20.410Z' } as User;

    const numeric2028: User = { firstName: 'Dwight', registeredAt: 1845979200 } as User;
    const numeric2033: User = { firstName: 'Andy', registeredAt: 2003745600 } as User;


    test('users with Unix timestamps are sorted in correct order', () => {
        const unordered = [numeric2033, numeric2028, numeric2033];

        let sorted = sortUsersByRegistrationDate(unordered);

        expect(sorted).toEqual([numeric2028, numeric2033, numeric2033]);
    });

    test('users with ISO dates are sorted in correct order', () => {
        const unordered = [string2031, string2027, string2029];

        let sorted = sortUsersByRegistrationDate(unordered);

        expect(sorted).toEqual([string2027, string2029, string2031]);
    });

    test('users with both numeric and string dates are sorted in correct order', () => {
        const unordered = [string2031, numeric2033, string2027, string2029, numeric2028];

        let sorted = sortUsersByRegistrationDate(unordered);

        expect(sorted).toEqual([string2027, numeric2028, string2029, string2031, numeric2033]);
    });

    test('sorting handles posts with identical dates without errors', () => {
        let sameUserTwice = [string2027, string2027];
        let sorted = sortUsersByRegistrationDate(sameUserTwice);

        expect(sorted).toEqual([string2027, string2027]);
    });

    test('sorting an empty array must not throw exceptions', () => {
        let sorted = sortUsersByRegistrationDate([]);

        expect(sorted).toEqual([]);
    });

    test('sorting must not modify the users', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
        const original = [Object.freeze(string2029), Object.freeze(numeric2028)];

        let sorted = sortUsersByRegistrationDate(original);

        expect(sorted).toEqual([numeric2028, string2029]);
    });

    test('sorting must not modify the original array', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
        const original = Object.freeze([string2029, string2027]) as User[];

        sortUsersByRegistrationDate(original);

        expect(original).toEqual([string2029, string2027]);
    });
});
