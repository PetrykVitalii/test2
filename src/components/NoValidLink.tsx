import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useLanguage from './common/hooks/useLanguage';
import WhatsAppIcon from './common/icons/WhatsAppIcon';

interface Props {
  src: string;
  text: string;
}

const NoValidLink:React.FC<Props> = ({ src = '/assets/smile.png', text = '' }) => {
  const [{ common }] = useLanguage();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (text) {
      setTitle(text);
    } else {
      setTitle(common.link);
    }
  });

  return (
    <Wrap height={window.innerHeight}>
      <Info>
        <Image src={src} alt="NoValid" />
        <Text>{title}</Text>
      </Info>
      <Support
        href={`https://wa.me/%2B${16502403661}?text=${common.contact_support}`}
        className="buyer invalid-link contact-support-btn"
        target="_blank"
      >
        <SupportText>{common.support}</SupportText>
        <WhatsAppWrap>
          <WhatsAppIcon />
        </WhatsAppWrap>
      </Support>
    </Wrap>
  );
};

const WhatsAppWrap = styled.div`
  width: 14px;
  height: 14px;
  margin-left: 8px;
  margin-bottom: 5px;
`;

const Image = styled.img`
  width: 50px;
  height: 66px;
  object-fit: contain;
`;

const SupportText = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const Wrap = styled.div<{height: number}>`
  height: ${({ height }) => height && `${height}px`};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 109px 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
  margin-top: 16px;
`;

const Support = styled.a`
  display: block;
  text-decoration: none;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  display: flex;
  padding: 7px 12px;
  align-items: center;
`;

export default NoValidLink;
