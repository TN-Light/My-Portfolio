
import type { SVGProps } from 'react';

export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 120"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="fire-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#888888" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
    </defs>
    <path
      fill="url(#fire-gradient)"
      d="M50 0C50 0 50 24.33 37.5 36.05C25 47.77 12.5 50.12 12.5 62.1C12.5 74.08 25 84.89 31.25 93.95C37.5 103.01 50 120 50 120C50 120 62.5 103.01 68.75 93.95C75 84.89 87.5 74.08 87.5 62.1C87.5 50.12 75 47.77 62.5 36.05C50 24.33 50 0 50 0Z"
    />
    <path
      fill="url(#fire-gradient)"
      opacity="0.7"
      d="M50 36.05C43.75 43.23 37.5 47.77 37.5 62.1C37.5 76.43 50 87.96 50 87.96V36.05Z"
      transform="scale(0.8) translate(12.5, 15)"
    />
  </svg>
);


export const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const BrushStroke1 = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 422 422" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <mask id="brush-stroke-1">
          <path d="M306.999 415.999C293.999 423.999 240.5 423.5 203.5 420.5C146.5 415.5 82.4999 409 31 386.5C-20.5 364 -1.00007 319.5 -0.500067 277.5C0.499933 193.5 -1.00007 131.5 4.99993 84.4999C10.9999 37.4999 31 1 31 1C102.5 1.00001 133 1 203.5 1C274 1 315.5 1.00001 386 16C456.5 31 422.5 95.5 418.5 137.5C414.5 179.5 419.5 246 418 299C416.5 352 402.5 397 375 410.5C347.5 424 320 407.999 306.999 415.999Z" fill="white"/>
      </mask>
    </defs>
  </svg>
);

// Remove unused brush strokes
export const BrushStroke2 = (props: SVGProps<SVGSVGElement>) => (
  <svg width="0" height="0" {...props} />
);

export const BrushStroke3 = (props: SVGProps<SVGSVGElement>) => (
 <svg width="0" height="0" {...props} />
);
