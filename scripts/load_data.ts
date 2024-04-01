#!/usr/bin/env bun

import { Database } from "bun:sqlite";
import fs from 'fs'
const DB_FILE = Bun.env.DATABASE_FILE;
import csv from 'fast-csv'

if (process.argv.length < 3) {
    console.error('Must give path to csv file on command line.');
    process.exit(123);
}

const input_path = process.argv[2];
if (!fs.existsSync(input_path)) {
    console.error(`Input file path "${input_path}" does not exist.`);
    process.exit(123);
}
console.log(input_path);

if (!DB_FILE) {
    console.error("Please set .env var DATABASE_FILE");
    process.exit(123);
}
if (fs.existsSync(DB_FILE)) {
    fs.rmSync(DB_FILE);
}

const database = new Database(DB_FILE, {create: true, readonly: false});

database.query(`CREATE TABLE "quotes" (
	"id"	INTEGER NOT NULL,
	"author"	TEXT NOT NULL,
	"quote"	TEXT NOT NULL,
    "year" TEXT,
	"last_used"	NUMERIC NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX "idx_author_quote" ON "quotes" (
	"author",
	"quote"
);
`).run();

const query = database.query(
    "insert into quotes (author, quote, year, last_used) values (?, ?, ?, 0);"
)
const existsAlready = database.query(
    "select count(1) as found from quotes where author = ? and quote = ?;"
)

var records = 0;

fs.createReadStream(input_path, {encoding: 'utf-8'})
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
        const author = Boolean(row["Author"]) ? row["Author"] as string : "unknown";
        const quote = row["Quote"] as string;
        if (Boolean(existsAlready.values(author, quote)[0][0])) {
            return;
        }
        query.run(author, quote, Boolean(row["Year"]) ? row["Year"] : null)
        records += 1;
    })
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows, entered ${records} quotes.`));
