module.exports = async function(context, req) {
  var request = require("request");
  //let searchUrl = `${process.env.twitter.Base_URL}/users/search.json?q=${req.query.q}`;
  //var options = {
  //  method: "GET",
  //  url:
  //    `${searchUrl}&include_entities=false`,
  //  headers: {
  //    Authorization:
  //      `OAuth oauth_consumer_key="${process.env.twitter.API_Key}",oauth_token="${process.env.twitter.Access_Token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1590226329",oauth_nonce="eI5dCa2GAvJ",oauth_version="1.0",oauth_signature="7LISXqTIUKZNwFPHyZdq7nARa5w%3D"`,
  //    Cookie:
  //      'personalization_id="v1_9kRL4WJXFohN0ftFkqjR+A=="; guest_id=v1%3A159013986595068807; lang=en'
  //  }
  //};
  //request(options, function(error, response) {
  //  if (error) throw new Error(error);
  //  console.log(response.body);
  //});
  if (req.query.q) {
    request.get(
      "https://api.twitter.com/1.1/users/show.json",
      {
        oauth: {
          consumer_key: process.env.twitter.API_Secret,
          consumer_secret: process.env.twitter.API_Key,
          token: process.env.twitter.Access_Token,
          token_secret: process.env.twitter.Token_Secret
        },
        qs: { q: req.query.q }
      },
      function(err, res, body) {
        if (err) {
          context.res = {
            status: 500,
            body: `Error occured: ${err}`
          };
        } else {
          context.res = {
            status: 200,
            body: body
          };
        }
      }
    );
  } else {
    context.res = {
      status: 400,
      body: "Please pass handle to search twitter"
    };
  }
};
