import React from 'react';

interface Props {
  style?: { [key: string]: string | number };
  width?: string;
  height?: string;
}

const ShareIcon: React.FC<Props> = ({ style, width = '16', height = '16' }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <g fill="none" fillRule="evenodd">
      <g fill="#21272E">
        <g>
          <g>
            <g>
              <path d="M11.733 10.647c-.473 0-.896.193-1.22.495L6.078 8.476c.031-.148.056-.296.056-.45 0-.155-.025-.302-.056-.45l4.387-2.641c.336.321.778.52 1.27.52 1.032 0 1.866-.86 1.866-1.927 0-1.067-.834-1.928-1.867-1.928s-1.866.861-1.866 1.928c0 .154.025.302.056.45l-4.387 2.64c-.336-.32-.778-.52-1.27-.52-1.032 0-1.866.861-1.866 1.928 0 1.066.834 1.927 1.867 1.927.491 0 .933-.199 1.269-.52l4.43 2.673c-.03.135-.05.276-.05.418 0 1.034.816 1.876 1.817 1.876 1.002 0 1.817-.842 1.817-1.876 0-1.035-.815-1.877-1.817-1.877z" transform="translate(-248 -400) translate(24 200) translate(212 188) translate(12 12)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default ShareIcon;
