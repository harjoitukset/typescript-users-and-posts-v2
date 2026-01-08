import express from 'express';
import request from 'supertest';
import { describe, expect, test } from 'vitest';
import { router } from './routes';

// Set up Express app for testing. This does not start the server or listen on any port.
const app = express();
app.use(router);

/*
 * The following tests only verify that the API routes return the expected data, headers, and status codes.
 * However, they do not test the filtering, sorting, or mapping logic. That level of testing is handled in
 * each separate test file for the corresponding feature being tested.
 *
 * This approach, hopefully, makes each individual test more focused and less prone to errors. Also, maintaining
 * tests that only verify one layer of the application logic can be easier to maintain and understand.
 */
describe('API Tests', () => {

    test('/api/v1/user returns an array of users', async () => {
        const response = await request(app).get('/api/v1/user');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(Array.isArray(response.body)).toBe(true);
    });


    test('/api/v1/user/2 returns a single user with posts', async () => {
        const response = await request(app).get('/api/v1/user/2');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');

        expect(response.body).toHaveProperty('username');
        expect(typeof response.body.username).toBe('string');

        expect(response.body).toHaveProperty('posts');
        expect(Array.isArray(response.body.posts)).toBe(true);
    });

    test('/api/v1/user/1234567890 returns a "not found" response', async () => {
        const response = await request(app).get('/api/v1/user/1234567890');

        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});
