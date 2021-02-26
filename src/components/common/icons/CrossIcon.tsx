import React from 'react';

interface Props {
  width?: string;
  height?: string;
}

const CrossIcon: React.FC<Props> = ({ width = '16', height = '16' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L16 0 16 16 0 16z"
                transform="translate(-292 -175) translate(125 165) translate(167 10)"
              />
              <path
                fill="#21272E"
                d="M12.778 3.23c-.296-.296-.773-.296-1.07 0L8 6.93 4.291 3.223c-.296-.296-.773-.296-1.07 0-.295.296-.295.773 0 1.07L6.932 8l-3.71 3.709c-.295.296-.295.773 0 1.07.297.295.774.295 1.07 0L8 9.068l3.709 3.71c.296.295.773.295 1.07 0 .295-.297.295-.774 0-1.07L9.068 8l3.71-3.709c.287-.288.287-.773 0-1.062z"
                transform="translate(-292 -175) translate(125 165) translate(167 10)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CrossIcon;
