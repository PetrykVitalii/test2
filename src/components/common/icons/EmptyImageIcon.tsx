import React from 'react';
import styled from 'styled-components';

const EmptyImageIcon: React.FC = () => (
  <ImageWrap>
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
      <g id="icon-/-24-/-Box--Copy-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="package" transform="translate(3.000000, 2.000000)" stroke="#B4BABF" strokeWidth="1.4">
          <line x1="13.5" y1="7.4" x2="4.5" y2="2.21" id="Path" />
          <path d="M18,14 L18,6 C17.9992679,5.28620161 17.6181681,4.62689901 17,4.27 L10,0.27 C9.38119785,-0.0872655899 8.61880215,-0.0872655899 8,0.27 L1,4.27 C0.38183192,4.62689901 0.00073214874,5.28620161 0,6 L0,14 C0.00073214874,14.7137984 0.38183192,15.373101 1,15.73 L8,19.73 C8.61880215,20.0872656 9.38119785,20.0872656 10,19.73 L17,15.73 C17.6181681,15.373101 17.9992679,14.7137984 18,14 Z" id="Path" />
          <polyline id="Path" points="0.27 4.96 9 10.01 17.73 4.96" />
          <line x1="9" y1="20.08" x2="9" y2="10" id="Path" />
        </g>
      </g>
    </svg>
  </ImageWrap>
);

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default EmptyImageIcon;
