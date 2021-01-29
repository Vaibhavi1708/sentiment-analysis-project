module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      comment_text: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.STRING,
      },
      star_rating: {
        type: Sequelize.STRING,
      },
      prod_id: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
    });
  
    return Comment;
  };
  