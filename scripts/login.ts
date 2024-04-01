#!/usr/bin/env bun

import { TwitterApi } from "twitter-api-v2";
const client = new TwitterApi({appKey: Bun.env.TWITTER_CONSUMER_KEY, appSecret: Bun.env.TWITTER_CONSUMER_SECRET});
async function readSingleLine() {
    // Get the async iterator from the console
    const iterator = console[Symbol.asyncIterator]();
  
    // Read the next line from the iterator (which reads from stdin)
    const { value: line } = await iterator.next();
  
    // Optionally, return the line after doing something with it
    return line as string; // This is your single line input
  }


const authLink = await client.generateAuthLink(undefined, {authAccessType: "write", linkMode: "authenticate"})
console.write(`
Follow this link:

${authLink.url}

Then enter the pin here:
> `)
const pin = (await readSingleLine()).trim();

const loginClient = new TwitterApi({
    appKey: Bun.env.TWITTER_CONSUMER_KEY,
    appSecret: Bun.env.TWITTER_CONSUMER_SECRET,
    accessToken: authLink.oauth_token,
    accessSecret: authLink.oauth_token_secret
})
const user = await loginClient.login(pin);

const {accessSecret, accessToken} = user;

console.log(`####  Login Successful.   ##########

Add the following to your .env file:

echo "TWITTER_OAUTH_TOKEN=${accessToken}" >> .env
echo "TWITTER_OAUTH_SECRET=${accessSecret}" >> .env

####################################`);
