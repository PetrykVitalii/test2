import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  isLoading?: boolean;
  src?: string;
}

const LazyFlag: React.FC<Props> = ({ isLoading, src }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);

  const handleOnLoad = () => {
    setIsImgLoading(false);
  };

  const isPlaceholderShown = isImgLoading || isLoading || !src;

  return (
    <Wrapper>
      <PlaceholderWrapper hide={!isPlaceholderShown}>
        <img
          style={{ opacity: 0.5 }}
          src="data:image/svg+xml,%3Csvg width='42px' height='31px' viewBox='0 0 42 31' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3ERectangle%3C/title%3E%3Cdefs%3E%3Cpath d='M0,2.1315803 C3.31400839,3.37806636 6.53688447,4.00130939 9.66862827,4.00130939 C18.8239118,4.00130939 24.2766766,0 32.6271216,0 C35.5545682,0 38.678861,0.710526767 42,2.1315803 L42,29.1315803 C40.5464476,27.6393869 37.4221548,26.8932902 32.6271216,26.8932902 C25.4345719,26.8932902 16.9461732,30.7644917 9.66862827,30.7644917 C4.81693166,30.7644917 1.59405557,30.2201879 0,29.1315803 L0,2.1315803 Z' id='path-1'%3E%3C/path%3E%3Cfilter x='-7.1%25' y='-9.8%25' width='114.3%25' height='119.5%25' filterUnits='objectBoundingBox' id='filter-2'%3E%3CfeMorphology radius='2' operator='erode' in='SourceAlpha' result='shadowSpreadInner1'%3E%3C/feMorphology%3E%3CfeGaussianBlur stdDeviation='2' in='shadowSpreadInner1' result='shadowBlurInner1'%3E%3C/feGaussianBlur%3E%3CfeOffset dx='0' dy='0' in='shadowBlurInner1' result='shadowOffsetInner1'%3E%3C/feOffset%3E%3CfeComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'%3E%3C/feComposite%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' type='matrix' in='shadowInnerInner1'%3E%3C/feColorMatrix%3E%3C/filter%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Rectangle'%3E%3Cuse fill='%23FFFFFF' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill='black' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
          alt=""
        />
      </PlaceholderWrapper>
      {src && <img src={src} onLoad={handleOnLoad} alt="" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 24px;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  99% {
    opacity: 0.01;
  }

  100% {
    opacity: 0;
  }
`;

const PlaceholderWrapper = styled.div<{ hide: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  animation-name: ${({ hide }) => hide && fadeOut};
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
`;

export default LazyFlag;
