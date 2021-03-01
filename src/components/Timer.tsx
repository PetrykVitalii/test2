import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface IProps {
  text?: string;
  duration: number;
  active?: boolean;
  action?: () => void;
  className?: string;
}

const Timer: React.FC<IProps> = ({
  text, duration, active = false, action, className,
}) => {
  const handleOnClick = () => {
    if (!active && action) {
      action();
    }
  };

  return (
    <CountDown className={`timer ${className}`} onClick={handleOnClick}>
      <CountDownNumber>{text}</CountDownNumber>
      <CountDownSVG>
        <CountDownCircle r="19" cx="21" cy="21" duration={duration} animate={active} />
      </CountDownSVG>
    </CountDown>
  );
};

const CountDown = styled.div`
  display: inline-block;
  position: relative;
  height: 40px;
  width: 40px;
  text-align: center;
  border: 2px solid rgba(33, 39, 46, 0.2);
  border-radius: 100%;
  margin: 0px 5px;
  background: #f3f4f5;
  cursor: pointer;
`;

const CountDownNumber = styled.div`
  color: #21272e;
  display: inline-block;
  line-height: 36px;
  margin: auto;
  font-size: 14px;
  font-wieght: bold;
`;

const CountDownSVG = styled.svg`
  position: absolute;
  width: 42px;
  height: 42px;
  transform: rotateY(-180deg) rotateZ(-90deg);
  left: -3px;
  top: -3.5px;
`;

const CountDownCircle = styled.circle<{ duration: number; animate: boolean }>`
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2.5px;
  stroke: ${({ animate }) => (animate ? '#21272e' : 'none')};
  fill: none;
  animation: ${({ animate, duration }) => animate
    ? css`
          ${countdown} ${duration / 1000}s linear infinite forwards
        `
    : 'none'};
`;

const countdown = keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 109px;
  }
`;

export default Timer;
