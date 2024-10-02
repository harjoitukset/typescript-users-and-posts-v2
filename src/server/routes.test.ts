import request from 'supertest';
import { router } from './routes';
import express from 'express';
import { describe, test } from '@jest/globals';
import { strict as assert } from 'node:assert';

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

        assert.equal(response.status, 200);
        assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
        assert.ok(Array.isArray(response.body));
    });


    test('/api/v1/user/2 returns a single user with posts', async () => {
        const response = await request(app).get('/api/v1/user/2');

        assert.equal(response.status, 200);
        assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');

        assert.ok('username' in response.body);
        assert.equal(typeof response.body.username, 'string');

        assert.ok('posts' in response.body);
        assert.ok(Array.isArray(response.body.posts));
    });

    test('/api/v1/user/1234567890 returns a "not found" response', async () => {
        const response = await request(app).get('/api/v1/user/1234567890');

        assert.equal(response.status, 404);
        assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
    });
});
