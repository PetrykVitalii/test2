import React from 'react';

interface Props {
  color?: string;
}

const LinkIcon: React.FC<Props> = ({ color = '#006E6E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke={color} strokeWidth="1.8">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path d="M13 8.667v5.2c0 .957-.776 1.733-1.733 1.733H1.733C.776 15.6 0 14.824 0 13.867V4.333C0 3.376.776 2.6 1.733 2.6h5.2M10.4 0L15.6 0 15.6 5.2M6.067 9.533L15.6 0" transform="translate(-30 -759) translate(0 733) translate(16 12) translate(14.4 14.4) translate(2.4 1.2)" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default LinkIcon;
