import React from 'react';
import type { QuoteProps } from './types';

const Quote: React.FC<QuoteProps> = ({ W, H, parts, iconBody, authorPath }) => {
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="100%" height="100%" fill="white"></rect>
      <rect
        x="10"
        y="10"
        width={W - 20}
        height={H - 20}
        stroke="black"
        strokeWidth="1"
        fill="none"></rect>
      {/* Background */}
      {/* Quote Text */}
      {parts.map(({ path, translateX, translateY }, index) => (
        <path
          key={index}
          stroke="black"
          strokeWidth="1"
          fill="black"
          transform={`translate(${translateX} ${translateY})`}
          d={path}
        />
      ))}
      {/* Author Text */}
      <g
        dangerouslySetInnerHTML={{ __html: iconBody }}
        transform={`translate(${W / 2 - 40} ${H * 0.15}) scale(3)`}
      />
      <path stroke="gray" strokeWidth="1" fill="gray" d={authorPath}></path>
    </svg>
  );
};

export default Quote;
