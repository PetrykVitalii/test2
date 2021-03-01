import React from 'react';

interface Props {
  style?: { [key: string]: string | number };
  width?: string | number;
  height?: string | number;
}

const CopyLink: React.FC<Props> = ({ style, width = '24', height = '24' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" style={style} width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path d="M0 0L24 0 24 24 0 24z" transform="translate(-25 -210) translate(25 200) translate(0 10)" />
              <path fill="#B4BABF" fillRule="nonzero" d="M17.5 7h-4.4v2.2h4.4c1.815 0 3.3 1.485 3.3 3.3 0 1.815-1.485 3.3-3.3 3.3h-4.4V18h4.4c3.036 0 5.5-2.464 5.5-5.5S20.536 7 17.5 7zm-6.6 8.8H6.5c-1.815 0-3.3-1.485-3.3-3.3 0-1.815 1.485-3.3 3.3-3.3h4.4V7H6.5C3.464 7 1 9.464 1 12.5S3.464 18 6.5 18h4.4v-2.2zm-3.3-4.4h8.8v2.2H7.6v-2.2z" transform="translate(-25 -210) translate(25 200) translate(0 10)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CopyLink;
