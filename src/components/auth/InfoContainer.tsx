import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useLanguage from '../common/hooks/useLanguage';
import ArrowIcon from '../common/icons/settings/ArrowIcon';

interface Props {
  text: string;
  image: any;
  isSkip?: boolean;
  classTracking: string;
}

const InfoContainer: React.FC<Props> = ({
  text, image, isSkip = false, classTracking,
}) => {
  const [{ authorization }] = useLanguage();

  return (
    <Container className={classTracking}>
      <ImageWrap>
        {image}
      </ImageWrap>
      <Wrap>
        <TextWrap>{text}</TextWrap>
        {isSkip && (
          <SkipWrap className="onboarding skip-for-now-cta" to="/setup/step5">
            <Skip>{authorization.skip_for_now}</Skip>
            <ArrowWrap>
              <ArrowIcon color="black" />
            </ArrowWrap>
          </SkipWrap>
        )}
      </Wrap>
    </Container>
  );
};

const Wrap = styled.div`
  width: calc(100% - 44px);
`;

const ArrowWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Skip = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: #21272e;
  text-decoration: none;
  margin-bottom: 2px;
  white-space: nowrap;
`;

const SkipWrap = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin-top: 12px;
`;

const Container = styled.div`
  padding: 18px 17px;
  border-radius: 8px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  display: flex;
  justify-content: space-between;
`;

const ImageWrap = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const TextWrap = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #787c80;
`;

export default InfoContainer;
