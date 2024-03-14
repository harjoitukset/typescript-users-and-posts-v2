import { filterOutDeletedPosts } from "./filtering";
import { mapPostsToUsers } from "./mapping";
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from "./sorting";
import { Post, User, UserWithPosts } from "./types";

/**
 * Reads posts from the `posts.json` file and returns them as an array.
 * The posts are sorted from oldest to newest and deleted posts are excluded.
 */
function getPosts(): Post[] {
    let posts = require('../data/posts.json') as Post[];

    // exclude posts that are marked as deleted:
    posts = filterOutDeletedPosts(posts);

    // posts are sorted from oldest to newest:
    posts = sortPostsByPublishedDate(posts);

    return posts;
}

/**
 * Reads users from the `users.json` file and returns them as an array.
 * The users are sorted from oldest to newest by registration date.
 */
function getUsers(): User[] {
    let users = require('../data/users.json') as User[];

    // users are sorted in ascending order by registration date
    users = sortUsersByRegistrationDate(users);

    return users;
}


/**
 * Reads the users and posts from the JSON files and prints them to the console.
 * Each user is printed along with their own posts.
 */
function printUsersAndPosts() {
    const users: User[] = getUsers();
    const posts: Post[] = getPosts();

    // posts are combined to users in a testable and reusable way
    let usersAndPosts: UserWithPosts[] = mapPostsToUsers(users, posts);

    usersAndPosts.forEach(user => {
        console.log(`# ${user.firstName} ${user.lastName} (${user.registeredAt})`);

        user.posts.forEach(p => {
            console.log(` - ${p.title}`);
            console.log(`   ${p.publishedAt} ${p.deletedAt ?? ''}`)
        });

        console.log(); // empty line between each user
    });
}

printUsersAndPosts();
