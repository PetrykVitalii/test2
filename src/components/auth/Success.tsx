import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { selectLink } from '@/store/selectors/auth';
import { selectDefaultCatalogId } from '@/store/selectors/user';
import useLanguage from '@/components/common/hooks/useLanguage';

import ShareIcon from '@/components/common/icons/auth/ShareIcon2';
import CheckWhite from '@/components/common/icons/dashboard/Check';
import CheckIcon from '@/components/common/icons/CheckIcon';

import CreateCatalogsStep from '@/components/auth/CreateCatalogStep';
import Button from '@/components/Button';

interface Props extends RouteComponentProps {}

const Success: React.FC<Props> = ({ history }) => {
  const link = useSelector(selectLink);
  const defaultCatalogId = useSelector(selectDefaultCatalogId);
  const [{ authorization, common }] = useLanguage();

  const [value, setValue] = useState(link);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let timer: number;

    if (copySuccess) {
      setValue(authorization.catalog_link_copied);

      timer = setTimeout(() => {
        setValue(link);
        setCopySuccess(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [copySuccess]);

  const openLink = () => {
    window.open(`${link}`, '_blank');
  };

  const sendInfo = () => {
    history.push(`/catalogs/${defaultCatalogId}`);
  };

  return (
    <Main height={window.innerHeight}>
      <CreateCatalogsStep active={[1, 1, 1]} done={[1, 1, 0]} />
      <Container>
        <Title>{authorization.first_catalog}</Title>
        <GreyText>{authorization.tap_the_catalog_link}</GreyText>

        <BoxWrapper>
          <ClipboardWrapper>
            <InputWrapper>
              <Label>{authorization.catalog_link_label}</Label>
              <Link
                className="catalog preview-catalog-link"
                href={value}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkText>{value.slice(0, value.indexOf('?')).replace('https://', '')}</LinkText>
                {copySuccess ? (
                  <IconBox>
                    <CheckIcon />
                  </IconBox>
                ) : (
                  <IconBox className="onboarding catalog share-btn" onClick={openLink}>
                    <IconWrap>
                      <ShareIcon />
                    </IconWrap>
                  </IconBox>
                )}
              </Link>
            </InputWrapper>
          </ClipboardWrapper>
        </BoxWrapper>

        <BtnWrapper>
          <Button classTracking="onboarding catalog cta-continue" shadow onClick={sendInfo}>
            <>
              <WhiteText>{common.btn_done}</WhiteText>
              <CheckWhite />
            </>
          </Button>
        </BtnWrapper>
      </Container>
    </Main>
  );
};

const Main = styled.div<{height: number}>`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: ${({ height }) => `${height}px`};

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 72px);
  }
`;

const Container = styled.div`
  padding: 0 24px;
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  padding-top: 32px;
  padding-bottom: 16px;
`;

const BoxWrapper = styled.div`
  margin-top: 43px;
  margin-bottom: 61px;
  display: flex;
`;

const ClipboardWrapper = styled.div`
  position: relative;
  height: 56px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  border: 1px solid #dae1e8;
  border-radius: 8px;
  height: 56px;
  width: 100%;
  
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 16px;
  padding-right: 50px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
`;

const LinkText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #3897ff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Label = styled.div`
  padding: 0 5px;
  background-color: #fff;
  position: absolute;
  top: -6px;
  left: 11px;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  color: #21272e;
`;

const BtnWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 24px;
`;

const GreyText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #787c80;
  line-height: 1.5;
`;

const WhiteText = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;
  margin-right: 6px;
`;

const IconBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  height: 48px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  background: #fff;
`;

const IconWrap = styled.div`
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
`;

export default Success;
