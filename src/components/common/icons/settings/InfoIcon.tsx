import React from 'react';

interface Props {
  color?: string;
}

const InfoIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L24 0 24 24 0 24z"
                transform="translate(-16 -368) translate(0 356) translate(16 12)"
              />
              <path
                fill={color}
                d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                transform="translate(-16 -368) translate(0 356) translate(16 12)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default InfoIcon;
