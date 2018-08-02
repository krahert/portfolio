const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const requireLogin = require('../middlewares/requireLogin');
const rateLimiter = require('../middlewares/rateLimiter');
const cleanCache = require('../middlewares/cleanCache');
const checkParam = require('../middlewares/checkParam');

const checkIfBoardIsAllowed = [
  'cyb',
  'tech',
  'code',
  'diy',
  'inter',
  'cult',
  'feels',
  'hum',
  'r'
];

module.exports = app => {
  app.get('/api/get_posts/:board', async (req, res) => {
    // check for parameter injection and regex ddos
    if (
      req.params.board.length > 5 ||
      !checkIfBoardIsAllowed.includes(req.params.board)
    ) {
      res.send({ msg: 'This board does not exist' });
    }

    // cache() este custom method-ul meu care o sa adauge rezultatul in cache.
    const posts = await Post.find({ board: req.params.board })
      .select({ comments: false })
      .cache({ key: req.params.board });
    res.send(posts);
  });

  app.post(
    '/api/create_post',
    rateLimiter({
      expiresSec: 2 * 60,
      maxRequests: 5,
      prefix: 'createPost-',
      message:
        'Too many new posts created in a short time span, please try again in 5 minutes.'
    }),
    requireLogin,
    cleanCache,
    async (req, res) => {
      const { message, title, board } = req.body;

      if (!checkIfBoardIsAllowed.includes(board)) {
        res.send({ msg: 'This board does not exist' });
      }

      const post = new Post({
        board,
        title,
        message,
        _user: req.user.id,
        username: req.user.username,
        dateCreated: Date.now(),
        dateUpdated: Date.now()
      });

      try {
        await post.save();
        // const fetchPosts = await req.user.save();
        const fetchPosts = await Post.find({}).select({ comments: false });
        res.send(fetchPosts);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );

  app.post('/api/post', requireLogin, checkParam('postId'), async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.body.postId });
      res.send(post);
    } catch (err) {
      // trebuie sa folosesc .status(422), dar imi respinge react response-ul.
      res.send({ err: 'Oops! Something went wrong, please try again later.' });
    }
  });

  app.post('/api/user_posts', requireLogin, checkParam('userId'), async (req, res) => {
    try {
      const posts = await Post.find({ _user: req.body.userId }).select({
        comments: false
      });
      res.send(posts);
    } catch (err) {
      res.send({ err: 'Oops! Something went wrong, please try again later.' });
    }
  });

  //----------------------------------------------------------------------------

  //todo A post should contain an array of arrays that can store many comments.
  app.post(
    '/api/add_comment',
    rateLimiter({
      expiresSec: 2 * 60,
      maxRequests: 10,
      prefix: 'createComment-',
      message:
        'Too many comments posted in a short time span, please try again in 5 minutes.'
    }),
    requireLogin,
    async (req, res) => {
      const { message, postId } = req.body;

      const comment = {
        user: req.user.username,
        userId: req.user.id,
        message: message,
        dateCreated: Date.now()
      };

      try {
        const currentPost = await Post.findOne({ _id: postId });
        currentPost.commentCount++;
        currentPost.dateUpdated = Date.now();
        currentPost.comments.push(comment);
        const result = await currentPost.save();
        res.send(result);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
