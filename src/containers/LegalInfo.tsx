import React from 'react';
import styled from 'styled-components';

import Navigation from '@/components/Navigation';
import ComingSoon from '@/components/ComingSoon';

const LegalInfo: React.FC = () => (
  <>
    <ComingSoonWrap>
      <ComingSoon />
    </ComingSoonWrap>
    <Navigation path="settings" />
  </>
);

const ComingSoonWrap = styled.div`
  padding: 35% 27px 0;
`;

export default LegalInfo;
