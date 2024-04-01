import {type Quote} from '../src/lib/db'
import ReactQuote from '../src/lib/ReactQuote'
import {renderToString} from "react-dom/server";
import {createElement} from 'react';
import { prepareQuote } from '$lib/prepare_quote';
import sharp from 'sharp';

export function makeImage(quote: Quote) : sharp.Sharp {
    const props = prepareQuote(quote);
    const svg  = renderToString(
        createElement(ReactQuote, props)
    )
    const buff = Buffer.from(svg);
    return sharp(buff).webp()
}