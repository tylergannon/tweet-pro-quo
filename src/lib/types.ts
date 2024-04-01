export interface LinePath {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  path: string;
  translateY: number;
  translateX: number;
}

export interface QuoteProps {
  W: number;
  H: number;
  parts: LinePath[];
  iconBody: string;
  authorPath: string;
}
