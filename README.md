# Canny Debugging Test

Ajay Ramasubramanian here. I have succesfully completed the assessment!

## Getting Started

1. **Initialize your environment**

We recommend using nvm for managing node versions.

Install nvm from [here](https://github.com/creationix/nvm)

Then install the node version for this assessment:

```sh
nvm i
```

1. **Install dependencies**

Next you'll need to install this app

```sh
npm install
```

1. **Run the backend**

The backend is a node server. Everything to do with the server lives in `/server`.

Terminal tab #1:

```sh
npm run backend
```

1. **Run the frontend**

Webpack is used to bundle and serve our app. Everything to do with the frontend lives in `/app`.

Terminal tab #2:

```sh
npm run frontend
```

Once everything is running, you should see the app running http://127.0.0.1:8080.

## Customer Issues Solutions

**Customer 1:** When I open the application, my posts do not load and all I see is a 'server error'.

### File: server/webserver/HTTPServer.js

- **Issue Identified:** Triggering a 500 Internal Server Error due to an unnecessary attempt to authenticate users without user context or login functionality.
- **Resolution Steps:** Temporarily disabled the `authenticateUser` function in the backend as user authentication functionality is not implemented in the frontend.
- **Resolution Outcome:** Ensured smooth operation of the application by disabling redundant authentication until it is required.

**Customer 2:** When I click on "Top" or "Old", the selector does not update with my new selection.

### File: app/components/PostsSort.js

- **Issue Identified:** Inadequate UI update for the `selectedName` div despite updating the state with `selectedOption`.
- **Resolution Steps:** Modified to dynamically set the `selectedOption` based on `this.props.sort` and `Options` values.
- **Resolution Outcome:** Ensured that the `selectedName` div displays the correct selected option based on the user's choice.

**Customer 3:** When I sort by "Top", there are posts with only 28 votes ranking higher than posts with 180 votes!

### File: app/utils/sortBy.js**
   
- **Issue Identified:** Sorting by 'votes' was not working as expected.
- **Resolution Steps:** Updated the sortBy function to handle sorting by 'votes' and implemented ascending/descending functionality based on the 'descending' flag.
- **Resolution Outcome:** Resolved the issue with sorting by 'votes' attribute, allowing proper ascending and descending sorting.

**Customer 4:** When I page through posts, although the posts are changing, the vote count in the top left corner does not match the total count of votes of the displayed posts.

### File: app/actions/posts.js

- **Issue Identified:** Asynchronous flow problem in the `fetchPosts` and `loadPosts` functions.
- **Resolution Steps:** Enhanced the asynchronous flow by dispatching `recountVotes` after posts were loaded and returning data after dispatching `postsLoaded`.
- **Resolution Outcome:** Improved the sequence of actions for loading posts and recounting votes for better functionality.

