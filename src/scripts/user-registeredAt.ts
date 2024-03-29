/*
 * This script adds a random `registeredAt` time to all Users in the `users.json` file.
 * You don't need to run this script, as the `users.json` file has already been updated.
 * For more information, see the /data/readme.md file in the root of the project.
 */
import { User } from "../types";

const users = require('../../data/users.json') as User[];
const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1_000;

// Add `registeredAt` to all Users.
users.forEach((user) => {
    // One to two years before current time:
    const oneToTwoYears = 1 + Math.random();
    const randomRegisteredAt = new Date(new Date().getTime() - oneToTwoYears * YEAR_IN_MILLISECONDS);

    // The value is either a number (epoch timestamp) or string (iso format)
    user.registeredAt = Math.random() < 0.5 ?
        randomRegisteredAt.toISOString() : Math.trunc(randomRegisteredAt.getTime() / 1_000); // divide by 1000 to make milliseconds into seconds
});

let usersJson = JSON.stringify(users, null, 2);
console.log(usersJson);

