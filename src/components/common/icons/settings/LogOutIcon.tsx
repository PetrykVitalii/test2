import React from 'react';

interface Props {
  color?: string;
}

const LogOutIcon: React.FC<Props> = ({ color = '#FEAA22' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <path
                d="M0 0L24 0 24 24 0 24z"
                transform="translate(-16 -518) translate(0 506) translate(16 12)"
              />
              <path
                fill={color}
                fillRule="nonzero"
                d="M10.79 16.29c.39.39 1.02.39 1.41 0l3.59-3.59c.39-.39.39-1.02 0-1.41L12.2 7.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L12.67 11H4c-.55 0-1 .45-1 1s.45 1 1 1h8.67l-1.88 1.88c-.39.39-.38 1.03 0 1.41zM19 3H5c-1.11 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                transform="translate(-16 -518) translate(0 506) translate(16 12)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default LogOutIcon;
