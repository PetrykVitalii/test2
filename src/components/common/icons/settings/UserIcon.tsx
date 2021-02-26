import React from 'react';

interface Props {
  color?: string;
}

const UserIcon: React.FC<Props> = ({ color = '#21272E' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <path
                  d="M0 0L32 0 32 32 0 32z"
                  transform="translate(-164 -220) translate(140 196) translate(24 24)"
                />
                <path
                  fill={color}
                  fillRule="nonzero"
                  d="M16 6.088c1.885 0 3.413 1.527 3.413 3.412S17.885 12.912 16 12.912c-1.885 0-3.412-1.527-3.412-3.412S14.114 6.088 16 6.088zm0 14.624c4.826 0 9.913 2.373 9.913 3.413v1.788H6.087v-1.788c0-1.04 5.087-3.413 9.913-3.413zM16 3c-3.591 0-6.5 2.909-6.5 6.5S12.409 16 16 16s6.5-2.909 6.5-6.5S19.591 3 16 3zm0 14.625c-4.339 0-13 2.177-13 6.5v3.25C3 28.269 3.731 29 4.625 29h22.75c.894 0 1.625-.731 1.625-1.625v-3.25c0-4.323-8.661-6.5-13-6.5z"
                  transform="translate(-164 -220) translate(140 196) translate(24 24)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default UserIcon;
