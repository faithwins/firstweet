module.exports = async function (context, req) {
  var rp = require("request-promise");
  let handle = req.query.q;
  if (handle) {
    let tweeps = [];
    let options = {
      uri: `${process.env.Twitter_Base_URL}/users/search.json`,
      oauth: {
        consumer_key: process.env.Twitter_API_Key,
        consumer_secret: process.env.Twitter_API_Secret,
        token: process.env.Twitter_Access_Token,
        token_secret: process.env.Twitter_Token_Secret
      },
      qs: { q: handle },
      json: true
    };
    await rp.get(options)
      .then(function (users) {
        tweeps = users;
      }).catch(function (err) {
        return {
          res: {
            status: 500,
            body: { message: `Error occured: ${err}` }
          }
        }
      });
    return {
      res: {
        status: 200,
        headers: {
          'content-type': 'application/json;charset=utf-8'
        },
        body: tweeps
      }
    };
  }
  else {
    return {
      res: {
        status: 400,
        body: { message: "Please pass handle to search twitter" }
      }
    }
  }
};
