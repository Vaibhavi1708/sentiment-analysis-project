const db = require('../models');

const Comment = db.comment;

exports.postComment = async (req, res) => {
  try {
    const data = await Comment.create({
      comment_text: req.body.comment_text,
      star_rating: req.body.star_rating,
      rating: rating,
      prod_id: req.query.prod_id,

      user_id: req.query.user_id,
    });

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
