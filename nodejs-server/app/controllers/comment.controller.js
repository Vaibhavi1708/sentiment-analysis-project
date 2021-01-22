const db = require("../models");

const Comment = db.comment;

exports.postComment = (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    star_rating: req.body.star_rating,

    prod_id: req.query.prod_id,
    user_id: req.query.user_id,
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllComments = (req, res) => {
  Comment.findAll({
    where: {
      prod_id: req.query.prod_id,
    },

    attributes: ["prod_id", "comment_text", "star_rating", "rating"],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving comments.",
      });
    });
};
