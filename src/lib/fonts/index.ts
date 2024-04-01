
import { loadSync } from "opentype.js";

const quote_font_path = "./src/lib/fonts/LibreCaslonDisplay-Regular.ttf";
const author_font_path = "./src/lib/fonts/JuliusSansOne-Regular.ttf";
export const quoteFont = loadSync(quote_font_path, { lowMemory: false });
export const author_font = loadSync(author_font_path, { lowMemory: false });
