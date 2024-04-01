import {get_quotes} from '../src/lib/db'
import { makeImage } from './make_image';

var idx = 0;

for (const it of get_quotes()) {
    await makeImage(it).toFile( `./out/${idx}.webp`)
    console.write(".")
    idx += 1;
}