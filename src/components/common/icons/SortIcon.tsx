import React from 'react';

interface Props {
  color?: string;
}

const TagIcon: React.FC<Props> = ({ color = '#3897ff' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <path
                  d="M0 0L16 0 16 16 0 16z"
                  transform="translate(-327 -240) translate(235 240) translate(62) translate(30 1)"
                />
                <path
                  fill={color}
                  d="M10.667 11.34V7.333c0-.366-.3-.666-.667-.666-.367 0-.667.3-.667.666v4.007H8.14c-.3 0-.447.36-.233.567l1.86 1.853c.133.127.34.127.473 0l1.86-1.853c.213-.207.06-.567-.233-.567h-1.2zm-4.9-9.107l-1.86 1.86c-.214.207-.067.567.233.567h1.193v4.007c0 .366.3.666.667.666.367 0 .667-.3.667-.666V4.66H7.86c.3 0 .447-.36.233-.567l-1.86-1.86c-.126-.126-.34-.126-.466 0z"
                  transform="translate(-327 -240) translate(235 240) translate(62) translate(30 1)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default TagIcon;
