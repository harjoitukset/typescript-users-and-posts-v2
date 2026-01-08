/*
 * You do not need to modify this file. You can run it with `npm run server` and see webapp at http://localhost:3000.
 * Initially, the returned data is not sorted or filtered. Your task is to implement the functions in the other files.
 * See the readme.md for more information.
 */

import express from 'express';
import { router } from './routes.js';

// If you want, you can define the port in an environment variable.
const PORT = process.env.PORT || 3000;


// This is our `express` web server. See the `express` documentation for more details.
const app = express();

app.set('json spaces', 4); // Pretty-print JSON responses

// Adds our request handlers defined in the routes.ts file to the server.
app.use(router);


// Redirect the root URL to /api/v1/user, to make the example easier to use.
app.get('/', (req, res) => {
    res.redirect('/api/v1/user');
});

// Start the server and log a message to the console to indicate that it's running.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
