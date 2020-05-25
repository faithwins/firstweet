module.exports = async function (context, req) {
    var rp = require("request-promise");
    let url = req.query.q;
    console.log('url :>> ', url);
    if (url) {
        let tweet = {};
        let options = {
            uri: `https://publish.twitter.com/oembed`,
            //oauth: {
            //    consumer_key: process.env.Twitter_API_Key,
            //    consumer_secret: process.env.Twitter_API_Secret,
            //    token: process.env.Twitter_Access_Token,
            //    token_secret: process.env.Twitter_Token_Secret
            //},
            qs: { url: url },
            json: true
        };
        await rp.get(options)
            .then(function (t) {
                console.log('t :>> ', t);
                tweet = t;

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
                body: tweet
            }
        };
    }
    else {
        return {
            res: {
                status: 400,
                body: { message: "Please pass encoded url of the tweet you want to retrieve" }
            }
        }
    }
};
