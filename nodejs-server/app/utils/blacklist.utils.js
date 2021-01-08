const redis = require("redis");
const client = redis.createClient();

addTokenInBlacklist = (token, blacklist) => {
  try {
    token_list = JSON.parse(blacklist);

    token_list.push(token);

    client.set("blacklist", JSON.stringify(token_list), redis.print);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

function verifyTokenInBlacklist(token) {
  return new Promise(async (resolve, reject) => {
    client.get("blacklist", (err, val) => {
      if (err) {
        reject(err);
      } else {
        let status = true;

        try {
          if (val) {
            token_list = JSON.parse(val);

            if (token_list.includes(token)) {
              //console.log("Blacklisted Token");
              status = false;
            } else {
              //console.log("Token not found in blacklist");
              status = true;
            }
          }
        } catch (err) {
          res.status(500).send({ message: err.message });
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
