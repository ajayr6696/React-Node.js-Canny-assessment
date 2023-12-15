import getPosts from '../data/getPosts';
import validateInput from '../utils/validateInput';

const GetPostsEndpoint = {
  data: {
    page: { validator: validateInput.integer, default: 1 },
    sort: { validator: validateInput.oneOf(['new', 'old', 'top']), default: 'old' },
  },

  respond: async function (request) {
    console.log('Entering GetPostsEndpoint');
    const { page, sort } = request.getData();
    console.log(page, sort);
    const { pages, posts } = getPosts(page, sort);

    request.respondJSON(
      JSON.stringify({
        pages,
        posts,
      })
    );
  },
};

module.exports = GetPostsEndpoint;
