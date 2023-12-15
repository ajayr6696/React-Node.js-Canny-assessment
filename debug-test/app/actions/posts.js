import { get } from '../utils/AJAX';

export const PostsError = 'canny/posts/error';
function postError(error) {
  return {
    error,
    timestamp: Date.now(),
    type: PostsError,
  };
}

export const PostsLoaded = 'canny/posts/loaded';
function postsLoaded(posts, pages) {
  return {
    pages,
    posts,
    timestamp: Date.now(),
    type: PostsLoaded,
  };
}

export const RecountVotes = 'canny/posts/recount';
export function recountVotes(posts, pages) {
  return {
    type: RecountVotes,
  };
}

// export function fetchPosts(params) {
//   return async (dispatch, getState) => {
//     const { error, pages, posts } = await get('/api/posts/get', params);
//     if (error) {
//       return dispatch(postError(error));
//     }
//     return dispatch(postsLoaded(posts, pages));
//   };
// }

// export function loadPosts() {
//   return async (dispatch, getState) => {
//     await dispatch(fetchPosts());
//     return dispatch(recountVotes());
//   };
// }

export function fetchPosts(params) {
  return async (dispatch) => {
    try {
      const { error, pages, posts } = await get('/api/posts/get', params);
      if (error) {
        return dispatch(postError(error));
      }
      dispatch(postsLoaded(posts, pages));
      dispatch(recountVotes()); // Dispatch recountVotes after posts are loaded
      return { pages, posts }; // Return data after dispatching postsLoaded
    } catch (error) {
      // Handle error
      dispatch(postError("An error occurred while fetching posts."));
      return null; // Return null or handle the error case as required
    }
  };
}

export function loadPosts() {
  return async (dispatch) => {
    const { pages, posts } = await dispatch(fetchPosts()); // Wait for fetchPosts to complete
    if (pages && posts) {
      return dispatch(recountVotes()); // Dispatch recountVotes after posts are loaded
    }
    // Handle if posts/pages are not available
    return null; // Return null or handle the case as required
  };
}
