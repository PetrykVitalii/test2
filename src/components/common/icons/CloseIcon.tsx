import React from 'react';

interface Props {
  width?: string;
  height?: string;
}

const CloseIcon: React.FC<Props> = ({ width = '24', height = '24' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <path d="M0 0L24 0 24 24 0 24z" transform="translate(-24 -120) translate(0 96) translate(24 24)" />
                <path fill="#21272E" d="M18.69 5.321c-.415-.414-1.084-.414-1.498 0L12 10.503 6.808 5.31c-.414-.415-1.083-.415-1.497 0-.415.414-.415 1.083 0 1.497L10.503 12 5.31 17.192c-.415.414-.415 1.083 0 1.497.414.415 1.083.415 1.497 0L12 13.497l5.192 5.192c.414.415 1.083.415 1.497 0 .415-.414.415-1.083 0-1.497L13.497 12l5.192-5.192c.404-.404.404-1.083 0-1.487z" transform="translate(-24 -120) translate(0 96) translate(24 24)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CloseIcon;
