import React from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

const BoxIcon: React.FC<Props> = ({ color = '#B4BABF', width = '32', height = '32' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke={color} strokeWidth="1.867">
        <g>
          <g>
            <path
              d="M18 9.867L6 2.947M24 18.667V8c-.001-.952-.51-1.83-1.333-2.307L13.333.36c-.825-.476-1.841-.476-2.666 0L1.333 5.693C.51 6.17.001 7.048 0 8v10.667c.001.951.51 1.83 1.333 2.306l9.334 5.334c.825.476 1.841.476 2.666 0l9.334-5.334c.824-.476 1.332-1.355 1.333-2.306z"
              transform="translate(-164 -307) translate(164 307) translate(4 2.667)"
            />
            <path
              d="M.36 6.613L12 13.347 23.64 6.613M12 26.773L12 13.333"
              transform="translate(-164 -307) translate(164 307) translate(4 2.667)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default BoxIcon;
