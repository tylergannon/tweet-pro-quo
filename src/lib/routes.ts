import type { Quote } from "./db";
import slugify from "slugify";

export function quote_slug(quote: Quote) {
  return slugify(quote.author) + "/" + slugify(quote.quote.substring(0, 40));
}
export function author_slug(author: string): string {
  return slugify(author);
}

export function author_path(author: string): string {
  return "/" + author_slug(author);
}

export function quote_path(quote: Quote): string {
  return "/" + quote_slug(quote);
}
