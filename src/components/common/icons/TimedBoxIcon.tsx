import React from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

const TimedBox: React.FC<Props> = ({ color = '#21272E', width = '24', height = '24' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g fill={color} fillRule="nonzero">
        <g>
          <g>
            <g>
              <path d="M19.927 5.935c.049.183.073.41.073.682v4.07c-.34-.057-.692-.087-1.05-.087-3.452 0-6.25 2.798-6.25 6.25 0 .977.224 1.901.624 2.725l-2.386 1.323c-.034.02-.072.04-.114.061-.041.02-.083.034-.124.041v-9.925zm-19.854 0l9.227 5.14V21c-.034-.007-.074-.02-.12-.04-.044-.021-.084-.041-.118-.062L1.43 16.664c-.47-.258-.826-.555-1.068-.891C.12 15.437 0 14.923 0 14.23V6.617c0-.272.024-.5.073-.682zm4.78-3.573l9.32 5.201-4.178 2.311-9.27-5.14c.146-.136.333-.269.56-.398l3.567-1.974zM10.004 0c.595 0 1.2.17 1.815.509l6.894 3.827c.228.13.415.262.56.397l-3.65 2.036-9.372-5.191L8.18.509C8.796.169 9.404 0 10.005 0z" transform="translate(-36 -624) translate(16 604) translate(20 20)" />
              <path d="M19 22c.686 0 1.33-.131 1.934-.394.604-.262 1.135-.623 1.595-1.082.46-.46.82-.99 1.08-1.592.26-.602.391-1.246.391-1.932 0-.686-.13-1.33-.39-1.932-.262-.601-.623-1.133-1.084-1.594-.461-.461-.993-.822-1.597-1.083-.604-.26-1.248-.391-1.934-.391-.68 0-1.32.13-1.924.39-.604.262-1.136.623-1.597 1.084-.461.461-.822.993-1.083 1.594C14.13 15.67 14 16.314 14 17c0 .686.131 1.33.394 1.932.262.601.623 1.132 1.082 1.592.46.46.991.82 1.595 1.082.604.263 1.247.394 1.929.394zm-.005-4.429h-2.49c-.103 0-.19-.035-.26-.105-.07-.07-.105-.157-.105-.26 0-.103.035-.19.105-.26.07-.07.157-.105.26-.105h2.13v-2.866c0-.1.035-.184.105-.254.07-.07.155-.106.255-.106.106 0 .194.035.265.106.07.07.105.155.105.254v3.23c0 .104-.035.19-.105.26-.07.07-.159.106-.265.106z" transform="translate(-36 -624) translate(16 604) translate(20 20)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default TimedBox;
