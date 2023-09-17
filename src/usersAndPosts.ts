import { filterOutDeletedPosts } from "./filtering";
import { mapPostsToUsers } from "./mapping";
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from "./sorting";
import { Post, User } from "./types";

let users = require('../data/users.json') as User[];
let posts = require('../data/posts.json') as Post[];


// Task: implement sorting based on registration date
users = sortUsersByRegistrationDate(users);

// Task: implement sorting logic based on publish dates
posts = sortPostsByPublishedDate(posts);

// Task: refactor code so that each user has an array of posts:
let usersAndPosts = mapPostsToUsers(users, posts);

usersAndPosts.forEach(user => {
    // Task: implement logic for excluding posts that have been deleted:
    let activePosts = filterOutDeletedPosts(user.posts);

    console.log(`# ${user.firstName} ${user.lastName} (${user.registeredAt})`);

    activePosts.forEach(p => {
        console.log(` - ${p.title}`);
        console.log(`   ${p.publishedAt} ${p.deletedAt ?? ''}`)
    });

    console.log(); // Empty line between each user
});
