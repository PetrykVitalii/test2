import React from 'react';
import styled from 'styled-components';

import WhatsApp from '@/components/common/icons/dashboard/WhatsApp';
import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

interface Props {
  supportTitle: String;
  supportSubText?: String;
  whatsappNumber: Number | String;
  whatsappMessage?: String;
}

const WhatsappSupport: React.FC<Props> = ({
  supportTitle,
  supportSubText,
  whatsappNumber,
  whatsappMessage,
}) => (
  <SupportMainWrap>
    <SupportWrapLink
      className="item add-item cta-info-panel"
      href={`https://wa.me/${whatsappNumber}/?text=${whatsappMessage}`}
      target="_blank"
    >
      <SupportWrap>
        <WhatsAppIconWrap>
          <WhatsApp />
        </WhatsAppIconWrap>
        <SupportInfoWrap>
          <SupportTitle>{supportTitle}</SupportTitle>
          <SupportSubTitle>{supportSubText}</SupportSubTitle>
        </SupportInfoWrap>
      </SupportWrap>
      <SmallArrowIconWrap>
        <SmallArrowIcon />
      </SmallArrowIconWrap>
    </SupportWrapLink>
  </SupportMainWrap>
);

const SupportMainWrap = styled.div`
  width: 100%;
  margin-top: 24px;
  padding: 0 24px;
`;

const SupportWrapLink = styled.a`
  border-radius: 6px;
  border: 1px solid rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

const WhatsAppIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
`;

const SupportWrap = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;

const SupportInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
`;

const SupportTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  color: #21272e;
`;

const SupportSubTitle = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #787c80;
`;

const SmallArrowIconWrap = styled.div`
  width: 16px;
  height: 16px;
`;

export default WhatsappSupport;
