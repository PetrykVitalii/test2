import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

import Timer from '@/components/Timer';
import Loader from '@/components/common/Loader';

export interface ISlide {
  title: string;
  desc?: string;
  video: string;
  duration: number;
}

interface ITimerFeaturesProps {
  slides: ISlide[];
}

interface ITimerProps {
  current: number;
  content: ISlide[];
  reset: (index: number) => void;
  startTimer: boolean;
}

const Timers: React.FC<ITimerProps> = ({
  current, content, reset, startTimer,
}) => {
  const { length } = content;
  const relative = ((current % length) + content.length) % content.length;

  return (
    <TimerWrapper>
      {content
        && content.map((_item, index) => (
          <>
            <Timer
              className={`btn-step-${index + 1}`}
              text={`${index + 1}`}
              duration={_item.duration}
              active={startTimer && relative === index}
              action={() => reset(index)}
            />
            {index < content.length - 1 && <TimerSeparator />}
          </>
        ))}
    </TimerWrapper>
  );
};

const TimerFeatures: React.FC<ITimerFeaturesProps> = ({ slides }) => {
  const videoRef = useRef<any>(null);

  const [current, setCurrent] = useState<number>(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fadeDuration = 1000;

  useEffect(() => {
    setIsLoading(false);

    if (videoRef.current) {
      setStartAnimation(true);
      setTimeout(() => { setStartAnimation(false); }, fadeDuration);
      videoRef.current.src = slides[current].video;
      // disableRemotePlayback does not visible in attrs video
      // videoRef.current.disableRemotePlayback = true;
    }

    return () => clearTimer();
  }, [slides, videoRef, current]);

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const triggerNext = () => {
    setCurrent((currentIndex: number) => {
      const isOverflow = currentIndex >= slides.length - 1;
      return isOverflow ? 0 : currentIndex + 1;
    });
  };

  const handleChange = (index: number) => {
    setStartTimer(false);
    setCurrent(() => index);
  };

  const handleOnCanPlayThrough = () => {
    setStartTimer(true);
  };

  const handleOnEnded = () => {
    setStartTimer(false);
    triggerNext();
  };

  return isLoading ? (
    <Loader scale="0.5" />
  ) : (
    <SliderWrapper>
      <ContentWrapper>
        <Timers current={current} content={slides} reset={handleChange} startTimer={startTimer} />
        <VideoContainer
          animate={startAnimation}
          fadeDuration={fadeDuration}
          className={`${startAnimation ? 'animate' : ''}`}
        >
          <SlideContent>
            <VideoContent>
              <Video
                ref={videoRef}
                playsInline
                preload="auto"
                autoPlay
                muted
                onCanPlayThrough={handleOnCanPlayThrough}
                onEnded={handleOnEnded}
                disableRemotePlayback
                controls={false}
              />
            </VideoContent>
            <TextWrapper>
              <SlideCounter>{`0${current + 1}`}</SlideCounter>
              <Heading>{slides[current].title}</Heading>
              <Description>{slides[current].desc}</Description>
            </TextWrapper>
          </SlideContent>
        </VideoContainer>
      </ContentWrapper>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin: 0 auto;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TimerWrapper = styled.div`
  display: block;
`;

const TimerSeparator = styled.span`
  display: inline-block;
  width: 15px;
  height: 2px;
  margin: 4px 3px;
  background: rgba(33, 39, 46, 0.2);
`;

const VideoContainer = styled.div<{ animate?: boolean; fadeDuration: number }>`
  width: 332px;
  height: 100%;
  margin-top: 50px;
  position: relative;
  z-index: 2;
  opacity: 1;
  animation: ${({ animate, fadeDuration }) => animate
    ? css`
          ${fadein} ${fadeDuration / 1000}s ease-in forwards
        `
    : 'none'};
`;

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SlideContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-grow: 0;
  width: 332px;
  height: auto;
`;

const VideoContent = styled.div`
  width: 100%;
  height: 300px;
  min-height: 300px;
`;

const Video = styled.video`
  width: 100%;
  height: 300px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  white-space: normal;
`;

const Heading = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const SlideCounter = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  color: #f43939;
`;

const Description = styled.div`
  max-width: 256px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #909599;
`;

export default TimerFeatures;
