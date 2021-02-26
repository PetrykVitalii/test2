import React from 'react';

interface Props {
  color?: string;
}

const FilterIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L24 0 24 24 0 24z"
                transform="translate(-312 -120) translate(0 96) translate(312 24)"
              />
              <path
                fill={color}
                fillRule="nonzero"
                d="M10.889 19h2.222c.611 0 1.111-.488 1.111-1.083 0-.596-.5-1.084-1.11-1.084h-2.223c-.611 0-1.111.488-1.111 1.084 0 .595.5 1.083 1.11 1.083zM2 7.083c0 .596.5 1.084 1.111 1.084H20.89C21.5 8.167 22 7.679 22 7.083 22 6.487 21.5 6 20.889 6H3.11C2.5 6 2 6.487 2 7.083zm4.444 6.5h11.112c.61 0 1.11-.487 1.11-1.083s-.5-1.083-1.11-1.083H6.444c-.61 0-1.11.487-1.11 1.083s.5 1.083 1.11 1.083z"
                transform="translate(-312 -120) translate(0 96) translate(312 24)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default FilterIcon;
