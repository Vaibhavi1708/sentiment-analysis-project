const redis = require('redis');
const client = redis.createClient();

addTokenInBlacklist = (token, blacklist) => {
  try {
    if (blacklist === null) token_list = [];
    else token_list = JSON.parse(blacklist);

    token_list.push(token);

    client.set('blacklist', JSON.stringify(token_list), redis.print);
  } catch (err) {}
};

function verifyTokenInBlacklist(token) {
  return new Promise(async (resolve, reject) => {
    client.get('blacklist', (err, val) => {
      if (err) {
        reject(err);
      } else {
        let status = true;

        try {
          if (val) {
            token_list = JSON.parse(val);

            if (token_list.includes(token)) {
              status = false;
            } else {
              status = true;
            }
          }
        } catch (err) {
          reject(err);
        }

        resolve({
          val: val,
          status: status,
        });
      }
    });
  });
}

const checkBlacklist = {
  addTokenInBlacklist,

  verifyTokenInBlacklist,
};

module.exports = {
  checkBlacklist,
};
