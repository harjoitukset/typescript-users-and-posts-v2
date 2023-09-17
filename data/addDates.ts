import { Post, User } from "../src/types";

const users = require('./users.json') as User[];
const posts = require('./posts.json') as Post[];

const today = new Date();
const monthInMillis = 30 * 24 * 60 * 60 * 1_000;

// Add random `publishedAt` to all posts within past 6 months
posts.forEach(post => {
    const randomPublishedAt = new Date(today.getTime() - Math.random() * 6 * monthInMillis);
    post.publishedAt = randomPublishedAt.toISOString();
});

// Add `deletedAt` to random posts (25 % chance)
posts.filter(p => Math.random() < 0.25).forEach(post => {
    // Random deletion time within one month from publishing date
    let deletedAt = new Date(new Date(post.publishedAt).getTime() + Math.random() * monthInMillis);
    post.deletedAt = deletedAt.toISOString();
});

// Add `registeredAt` to all Users.
users.forEach((user) => {
    // One to two years before current time:
    const randomRegisteredAt = new Date(today.getTime() - 12 * monthInMillis - Math.random() * 12 * monthInMillis);

    // The value is either a number (epoch timestamp) or string (iso format)
    user.registeredAt = Math.random() < 0.5 ?
        randomRegisteredAt.toISOString() : Math.trunc(randomRegisteredAt.getTime() / 1_000);
});

let postsJson = JSON.stringify(posts, null, 4);
console.log(postsJson);

let usersJson = JSON.stringify(users, null, 4);
console.log(usersJson);
