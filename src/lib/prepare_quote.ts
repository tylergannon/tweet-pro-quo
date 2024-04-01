import type { Quote } from "./db";
import { author_font, quoteFont } from "./fonts";
import { getIconData } from "./iconify";
import type { LinePath, QuoteProps } from "./types";

const iconBody = getIconData("ri:double-quotes-r").body;

const W = 1080;
const H = 700;
const LINE_SPACE = 18;
const LINE_HEIGHT = 50;
const CHARS_PER_LINE = 45;

function len(data: string[]) {
  return data.reduce((acc, word) => acc + word.length + (acc == 0 ? 0 : 1), 0);
}

function chunk_text(text: string, width: number): string[] {
  const parts = text.split(" ").reverse();
  const int: string[][] = [];

  var current: string[] = [];
  while (parts.length > 0) {
    const word = parts.pop()!;
    if (len(current) + word.length > width) {
      int.push(current);
      current = [word];
    } else {
      current.push(word);
    }
  }
  if (current.length > 0) int.push(current);
  while (true) {
    let changed = false;
    for (let i = 0; i < int.length; i++) {
      // If i >= 1 and we can borrow one from the line behind without
      // it becoming the shortest or without us becoming the longest, we'll do it.
      const my_len = len(int[i]);
      if (
        i > 0 &&
        int[i].length > 1 &&
        len(int[i - 1]) + 1 + int[i][0].length < my_len
      ) {
        changed = true;
        int[i - 1].push(int[i].shift()!);
      } else if (
        i + 1 < int.length &&
        len(int[i + 1]) + 1 + int[i][int[i].length - 1].length < my_len
      ) {
        changed = true;
        int[i + 1].unshift(int[i].pop()!);
      }
    }
    if (!changed) {
      break;
    }
  }
  return int.map((it) => it.join(" "));
}

function makePath(line: string): LinePath {
  const path = quoteFont.getPath(line, 0, 0, 60, {});
  const { x1, y1, x2, y2 } = path.getBoundingBox();
  const x_w = x2 - x1;
  const margin = (W - x_w) / 2;
  const translateX = margin - x1;
  return {
    translateX,
    translateY: 0,
    x1,
    y1,
    x2,
    y2,
    path: path.toPathData(3),
  };
}

export function prepareQuote(quoteData: Quote): QuoteProps {
  const { author, quote, year } = quoteData;
  const parts = chunk_text(quote, CHARS_PER_LINE).map(makePath);
  const totalHeight = parts.reduce(
    (acc, val) => acc + val.y2 - val.y1,
    LINE_SPACE * (parts.length - 1)
  );
  var curr_height = (H - totalHeight) / 2;

  for (const line of parts) {
    line.translateY = curr_height - line.y1;
    curr_height += LINE_SPACE + LINE_HEIGHT;
  }

  const authorPath = author_font.getPath(
    `- ${author}` + (year === null ? "" : `, ${year}`),
    W * 0.5,
    H * 0.75,
    26
  ).toPathData(3);

  return {
    authorPath,
    H,
    W,
    iconBody,
    parts
  }
}
