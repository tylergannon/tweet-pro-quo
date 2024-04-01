import {cloneElement, createElement} from 'react';
import {get_quotes, get_quote} from '$lib/db'
import ReactQuote from '$lib/ReactQuote'
import {renderToString} from "react-dom/server";
import { prepareQuote } from '$lib/prepare_quote';
import sharp from 'sharp';
import type { APIRoute } from 'astro'
export function getStaticPaths() {
    return get_quotes().map(({id}) => ({
        params: {
            id
        }
    }))
}



        // <ReactQuote {...props} />
export const GET: APIRoute<{id: string}> = async ({params}) => {

    const quote = get_quote(parseInt(params.id!));
    const props = prepareQuote(quote);
    const svg  = renderToString(
        createElement(ReactQuote, props)
    )
    const buff = Buffer.from(svg);
    const image = await sharp(buff).webp().toBuffer()
    return new Response(image, {
        headers: {
            'Content-Type': 'image/webp'
        }
    });
}
