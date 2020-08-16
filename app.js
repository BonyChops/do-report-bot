const cron = require('node-cron');
const fs = require('fs')
const encourageWords = JSON.parse(fs.readFileSync('./encourageWords.json'));
const func = require('./src/func');
let config = JSON.parse(fs.readFileSync('./config.json'));
const saveData = (data) => {fs.writeFileSync('./config.json', JSON.stringify(data))}

const task = async() => {
    const tweets = await func.getTweets(config.twitter.target);
    if(config.last_id_str === undefined){
        const lastTweet = tweets.reduce((acc, tweet) => {
            return acc.id_str > tweet.id_str ? acc : tweet;
        }, {id_str: 0});
        config.last_id_str = lastTweet.id_str;
        saveData(config);
    }
    tweets.filter(tweet => (Number(tweet.id_str) > Number(config.last_id_str))).forEach((tweet) => {
        console.log("tweet found");
        console.log(tweet.id_str)
        const msg = encourageWords[Math.floor(Math.random() * encourageWords.length)];
        func.sendReply(msg, tweet.id_str);
    });
    const lastTweet = tweets.reduce((acc, tweet) => {
        return acc.id_str > tweet.id_str ? acc : tweet;
    }, {id_str: 0});
    config.last_id_str = lastTweet.id_str;
    saveData(config);
}

cron.schedule('* * * * *', () => {
    task();
});
task();