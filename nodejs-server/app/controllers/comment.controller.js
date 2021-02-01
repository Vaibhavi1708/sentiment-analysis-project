const db = require('../models');
const { sentimentAnalysis } = require('../utils/sentimentAnalysis.utils');
const getRating = require('../utils/queries');

const Comment = db.comment;

exports.postComment = async (req, res) => {
  try {
    let commentText = '';
    if (req.body.comment_text) {
      commentText = req.body.comment_text;
      rating = sentimentAnalysis.analyzer(req.body.comment_text);
      if (!rating) {
        commentText = '';
        rating = null;
      }
    } else rating = null;
    const data = await Comment.create({
      comment_text: commentText,
      star_rating: req.body.star_rating,
      rating: rating,
      prod_id: req.query.prod_id,

      user_id: req.query.user_id,
    });
    await getRating.getRating(data.prod_id);
    return res.status(200).send(data);
  } catch (err) {}
};

exports.findAllComments = async (req, res) => {
  try {
    const data = await Comment.findAll({
      where: {
        prod_id: req.query.prod_id,
      },

      attributes: [
        'prod_id',
        'comment_text',
        'star_rating',
        'rating',
        'user_id',
      ],
    });
    return res.status(200).send(data);
  } catch (err) {}
};
