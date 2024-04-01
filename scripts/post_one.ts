#!/usr/bin/env bun
import { TwitterApi, EUploadMimeType } from "twitter-api-v2";
import { get_random, update_timestamp } from "../src/lib/db";
import fs from "fs";
import { makeImage } from "./make_image";

type EnvVar =
  | "TWITTER_CONSUMER_KEY"
  | "TWITTER_CONSUMER_SECRET"
  | "TWITTER_OAUTH_TOKEN"
  | "TWITTER_OAUTH_SECRET"

function verify_value_present(envvar: EnvVar) {
  const value = Bun.env[envvar];
  if (value === undefined || value.length == 0) {
    console.error(
      `Environment must include ${envvar} variable.  See documentation and check .env file.`
    );
    process.exit(123);
  }
}
const env_vars: EnvVar[] = [
  "TWITTER_OAUTH_SECRET",
  "TWITTER_OAUTH_TOKEN",
  "TWITTER_CONSUMER_KEY",
  "TWITTER_CONSUMER_SECRET",
];
env_vars.forEach(verify_value_present);

const api = new TwitterApi({
  appKey: Bun.env.TWITTER_CONSUMER_KEY,
  appSecret: Bun.env.TWITTER_CONSUMER_SECRET,
  accessToken: Bun.env.TWITTER_OAUTH_TOKEN,
  accessSecret: Bun.env.TWITTER_OAUTH_SECRET
});

const quote = get_random();
console.log("upload media");

const buffer = await makeImage(quote).toBuffer();
const media_id = await api.v1.uploadMedia(buffer, {
  target: "tweet",
  mimeType: EUploadMimeType.Webp,
});
console.log("uploaded ", media_id);
console.log(media_id);
await api.v2.tweet({ media: { media_ids: [media_id] } });

update_timestamp(quote.id);
console.log(quote.quote);
console.log(quote.author);
console.log("Success.")
