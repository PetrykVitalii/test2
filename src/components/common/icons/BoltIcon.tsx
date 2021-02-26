import React from 'react';

interface Props {
  color?: string;
}

const CheckIcon: React.FC<Props> = ({ color = '#FFF' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" opacity=".6">
      <g stroke={color} strokeWidth="2.4">
        <g>
          <g>
            <g>
              <path
                d="M12 0L0 14.4 10.8 14.4 9.6 24 21.6 9.6 10.8 9.6z"
                transform="translate(-36 -262) translate(16 238) translate(20 24) translate(5.333 4)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CheckIcon;
