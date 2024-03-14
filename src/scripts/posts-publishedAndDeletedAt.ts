/*
 * This script adds a random `publishedAt` time to all Posts in the `posts.json` file.
 * Some posts are also randomly given a `deletedAt` time that means the post has been deleted.
 * You don't need to run this script, as the `posts.json` file has already been updated.
 * For more information, see the /data/readme.md file in the root of the project.
 */
import { Post } from "../types";

const posts = require('../../data/posts.json') as Post[];

const today = new Date();
const MONTH_MILLISECONDS = 30 * 24 * 60 * 60 * 1_000;

// Add random `publishedAt` to all posts within past 6 months
posts.forEach(post => {
    const randomPublishedAt = new Date(today.getTime() - Math.random() * 6 * MONTH_MILLISECONDS);
    post.publishedAt = randomPublishedAt.toISOString();
});

// Add `deletedAt` to random posts (25 % chance)
posts.filter(p => Math.random() < 0.25).forEach(post => {
    // Random deletion time within one month from publishing date
    let deletedAt = new Date(new Date(post.publishedAt).getTime() + Math.random() * MONTH_MILLISECONDS);
    post.deletedAt = deletedAt.toISOString();
});


let postsJson = JSON.stringify(posts, null, 2);
console.log(postsJson);

