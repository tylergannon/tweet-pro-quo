declare module "bun" {
  interface Env {
    TWITTER_CONSUMER_KEY: string;
    TWITTER_CONSUMER_SECRET: string;
    TWITTER_OAUTH_TOKEN: string;
    TWITTER_OAUTH_SECRET: string;
    TWITTER_API_PIN: string;
  }
}
