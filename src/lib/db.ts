import { Database } from "bun:sqlite";

const DB_PATH = import.meta.env.DATABASE_FILE;
if (!DB_PATH) {
  console.error("Please specify DATABASE_FILE in .env.");
  process.exit(123);
}
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const QUOTE_REUSE_PERIOD =
  parseFloat(import.meta.env.QUOTE_REUSE_PERIOD_DAYS) * MS_PER_DAY;

const database = new Database(DB_PATH);
export type Quote = {
  id: number;
  author: string;
  quote: string;
  last_used: number;
  year: string | null;
};
const _get_quote = database.query(`
    select id, author, quote, year, last_used from quotes where id = ?;
`);

const _get_quotes = database.query(`
    select id, author, quote, year, last_used from quotes order by author, quote;
`);

const _get_random_quote = database.query(`
    select id, author, quote, year from quotes where last_used < ? order by random() limit 1;
`);

const _update_timestamp = database.query(
  `update quotes set last_used = ? where id = ?;`
);

export function get_quotes() {
  return _get_quotes.all() as Quote[];
}

export function get_quote(id: number) {
  return _get_quote.get(id) as Quote;
}

export function get_random(): Quote {
  return _get_random_quote.get(
    new Date().getTime() - QUOTE_REUSE_PERIOD
  ) as Quote;
}

export function update_timestamp(id: number) {
  _update_timestamp.run(new Date().getTime(), id);
}

// function timestampFromDaysAgo(daysAgo: number): number {
//   const millisecondsAgo = daysAgo * QUOTE_REUSE_PERIOD; // Convert days to milliseconds
//   const now = new Date().getTime(); // Current timestamp in milliseconds
//   return now - millisecondsAgo; // Calculate past timestamp
// }
