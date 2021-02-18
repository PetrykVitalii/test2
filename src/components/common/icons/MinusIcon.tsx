import React from 'react';

interface Props {
  color: string;
}

const MinusIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <path d="M0 0L16 0 16 16 0 16z" transform="translate(-232 -344) translate(-8 320) translate(240 16) translate(0 8)" />
                <path fill={color} d="M12 8.667H4c-.367 0-.667-.3-.667-.667 0-.367.3-.667.667-.667h8c.367 0 .667.3.667.667 0 .367-.3.667-.667.667z" transform="translate(-232 -344) translate(-8 320) translate(240 16) translate(0 8)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default MinusIcon;
