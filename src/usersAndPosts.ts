import { filterOutDeletedPosts } from "./filtering";
import { mapPostsToUsers } from "./mapping";
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from "./sorting";
import { Post, User } from "./types";


function getPosts(): Post[] {
    let posts = require('../data/posts.json') as Post[];

    // Task: implement logic for excluding posts that have been deleted:
    posts = filterOutDeletedPosts(posts);

    // Task: implement sorting logic based on publish dates
    posts = sortPostsByPublishedDate(posts);

    return posts;
}

function getUsers(): User[] {
    let users = require('../data/users.json') as User[];

    // Task: implement sorting based on registration date
    users = sortUsersByRegistrationDate(users);

    return users;
}

function printUsersAndPosts() {
    const users = getUsers();
    const posts = getPosts();

    // Task: refactor code so that each user has an array of posts:
    let usersAndPosts = mapPostsToUsers(users, posts);

    usersAndPosts.forEach(user => {
        console.log(`# ${user.firstName} ${user.lastName} (${user.registeredAt})`);

        user.posts.forEach(p => {
            console.log(` - ${p.title}`);
            console.log(`   ${p.publishedAt} ${p.deletedAt ?? ''}`)
        });

        console.log(); // Empty line between each user
    });
}

printUsersAndPosts();
