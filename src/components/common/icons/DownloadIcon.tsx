import React from 'react';

interface Props {
  color?: string;
}

const LinkIcon: React.FC<Props> = ({ color = '#004085' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke={color} strokeWidth="2">
        <g>
          <g>
            <g>
              <path
                d="M16 10.667v3.555c0 .982-.796 1.778-1.778 1.778H1.778C.796 16 0 15.204 0 14.222v-3.555M3.556 6.222L8 10.667 12.444 6.222M8 10.667L8 0"
                transform="translate(-16 -416) translate(0 404) translate(16 12) translate(4 4)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default LinkIcon;
