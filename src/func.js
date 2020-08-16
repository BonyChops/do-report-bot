const Twitter = require('twitter');
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./config.json'));
const client = new Twitter({
    consumer_key: config.twitter.CONSUMER_KEY,
    consumer_secret: config.twitter.CONSUMER_SECRET,
    access_token_key: config.twitter.ACCESS_TOKEN_KEY,
    access_token_secret: config.twitter.ACCESS_TOKEN_SECRET
});

exports.getTweets = (screen_name) => {
    return client.get('statuses/user_timeline', { screen_name });
}

exports.sendReply = (status, in_reply_to_status_id) => {
    client.post('statuses/update', {
        "status": status,
        "in_reply_to_status_id": in_reply_to_status_id, // URLの最後の数字
        'auto_populate_reply_metadata': true, // metadata(ユーザー情報)自動付与
    }, function (error, tweet, response) {
        if (error){
            console.log("Deleted tweet.")
        }
    })
}

exports.tweet = (status, ) => {
    client.post('statuses/update', {
        "status": status
    }, function (error, tweet, response) {
        if (error){
            console.log("Deleted tweet.")
        }
    })
}