/*
 * You do not need to modify this file. You can run it with `npm start` and see the output in the console.
 * Initially, the output is not sorted or filtered. Your task is to implement the functions in the other files.
 * See the readme.md for more information.
 */
import { getPosts, getUsers } from "./files.ts";
import { excludeDeletedPosts } from "./filtering.ts";
import { mapPostsToUsers } from "./mapping.ts";
import { sortPostsByPublishedDate, sortUsersByRegistrationDate } from "./sorting.ts";
import { type Post, type User, type UserWithPosts } from "./types.ts";


/**
 * Reads the users and posts from the JSON files and prints them to the console.
 * Each user is printed along with their own posts.
 */
async function printUsersAndPosts() {
    const allUsers: User[] = await getUsers();
    const allPosts: Post[] = await getPosts();

    // sort and filter users and posts before combining them
    const sortedUsers = sortUsersByRegistrationDate(allUsers);
    const activePostsSorted = sortPostsByPublishedDate(excludeDeletedPosts(allPosts));

    // each user will be combined with their own posts
    let usersAndPosts: UserWithPosts[] = mapPostsToUsers(sortedUsers, activePostsSorted);

    usersAndPosts.forEach(user => {
        console.log(createUserPostReport(user));
        console.log(''); // empty line between users
    });
}

/**
 * Returns a string representation of a user and their posts in a markdown-like format.
 */
function createUserPostReport(user: UserWithPosts) {
    const lines = [
        `# ${user.firstName} ${user.lastName}, registered: (${user.registeredAt})`,
        `` // empty line between the user and their posts
    ];

    user.posts.forEach(p => {
        lines.push(`- ${p.title}`);
        lines.push(`  Published: ${p.publishedAt}`);
        if (p.deletedAt) {
            lines.push(`  Deleted: ${p.deletedAt}`);
        }
    });

    return lines.join('\n');
}

printUsersAndPosts();
