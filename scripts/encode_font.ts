import fs from 'fs'

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

const file = fs.readFileSync(
    input_path
)

fs.writeFileSync(
    `${input_path}.txt`,
    file.toString('base64'),
    {
        flush: true,
    }
)
