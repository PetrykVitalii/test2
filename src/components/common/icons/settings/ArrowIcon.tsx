import React from 'react';

interface Props {
  color?: string;
}

const ArrowIcon: React.FC<Props> = ({ color = '#B4BABF' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L24 0 24 24 0 24z"
                transform="translate(-320 -184) translate(0 164) translate(320 20)"
              />
              <path
                fill={color}
                d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
                transform="translate(-320 -184) translate(0 164) translate(320 20)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default ArrowIcon;
