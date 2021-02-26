import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import useLanguage from '@/components/common/hooks/useLanguage';

import BackIcon from '@/components/common/icons/BackIcon';
import TimerFeatures, { ISlide } from '@/components/TimerFeatures';
import FixedHeader from '@/components/FixedHeader';

const Help: React.FC = () => {
  const history = useHistory();

  const [{ howItWorks }] = useLanguage();

  const [slides, setSlides] = useState<ISlide[]>([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (!Object.keys(howItWorks).length) {
      return;
    }

    const slidesData = [
      {
        video: howItWorks.step_one_video_url,
        title: howItWorks.step_one_title,
        desc: howItWorks.step_one_desc,
        duration: 6340,
      },
      {
        video: howItWorks.step_two_video_url,
        title: howItWorks.step_two_title,
        desc: howItWorks.step_two_desc,
        duration: 5339,
      },
      {
        video: howItWorks.step_three_video_url,
        title: howItWorks.step_three_title,
        desc: howItWorks.step_three_desc,
        duration: 9610,
      },
      {
        video: howItWorks.step_four_video_url,
        title: howItWorks.step_four_title,
        desc: howItWorks.step_four_desc,
        duration: 6340,
      },
    ];

    setSlides(slidesData);
  }, [howItWorks]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <BackIconWrap onClick={handleBack}>
            <BackIcon />
          </BackIconWrap>
          <HeaderTitle>{howItWorks.header_title}</HeaderTitle>
        </HeaderWrap>
      </FixedHeader>
      <Main>
        <TimerFeatures slides={slides} />
      </Main>
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  width: 100%;
  justify-content: flex-start;
`;

const BackIconWrap = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const Main = styled.div`
  padding: 32px 27px 0;
  background-color: #ffffff;
`;

export default Help;
