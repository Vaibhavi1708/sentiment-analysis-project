const db = require('../models');

const getRating = async (prod_id) => {
  const { QueryTypes } = require('sequelize');

  const comment_rating = await db.sequelize.query(
    ' select avg(rating) as avg_comment_rating, prod_id  from comment group by prod_id having prod_id = ' +
      prod_id +
      ';',
    {
      type: QueryTypes.SELECT,
    }
  );
  const avg_comment_rating = comment_rating[0].avg_comment_rating;

  const star_rating = await db.sequelize.query(
    ' select avg(star_rating) as avg_star_rating, prod_id  from comment group by prod_id having prod_id = ' +
      prod_id +
      ';',
    {
      type: QueryTypes.SELECT,
    }
  );
  const avg_star_rating = star_rating[0].avg_star_rating;

  let overall_rating = 0;
  if (!avg_comment_rating) {
    overall_rating = avg_star_rating;
  } else {
    overall_rating = (avg_comment_rating + avg_star_rating) / 2;
  }

  const get_no_of_reviews = await db.sequelize.query(
    'select count(*) as no_of_reviews, prod_id from comment group by prod_id having prod_id=' +
      prod_id +
      ';',
    {
      type: QueryTypes.SELECT,
    }
  );
  const no_of_reviews = get_no_of_reviews[0].no_of_reviews;

  
  const updated_overall_rating = await db.sequelize.query(
    'UPDATE product SET overall_rating= ' +
      overall_rating +
      ', no_of_reviews= ' +
      no_of_reviews +
      ' WHERE id = ' +
      prod_id +
      ';',
    {
      type: QueryTypes.SELECT,
    }
  );
};


module.exports = {
  getRating,
};
