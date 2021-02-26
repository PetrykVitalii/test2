import React from 'react';

interface Props {
  color?: string;
}

const EyeOffIcon: React.FC<Props> = ({ color = '#B4BABF' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke={color}>
        <g>
          <g>
            <g>
              <path strokeWidth="2" d="M13.86 13.86c-1.399 1.066-3.102 1.657-4.86 1.685C3.273 15.545 0 9 0 9c1.018-1.897 2.43-3.554 4.14-4.86m3.142-1.49c.563-.13 1.14-.197 1.718-.195C14.727 2.455 18 9 18 9c-.497.93-1.089 1.804-1.767 2.61m-5.498-.875c-.612.656-1.534.927-2.404.704-.87-.222-1.548-.9-1.77-1.77-.223-.87.048-1.792.704-2.404" transform="translate(-232 -225) translate(24 190) translate(208 35) translate(3 3)" />
              <path strokeWidth="2.25" d="M0 0L18 18" transform="translate(-232 -225) translate(24 190) translate(208 35) translate(3 3)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default EyeOffIcon;
