import React from 'react';
import styled from 'styled-components';

import CrossIcon from '@/components/common/icons/CrossIcon';

interface Props {
  id?: string;
  classTracking?: string;
  text: string;
  cross: boolean;
  onClick?: () => void;
  onCrossClick?: () => void;
}

const Tag: React.FC<Props> = ({
  id, classTracking, text, cross, onClick, onCrossClick,
}) => (
  <TagWrap id={id} className={classTracking} onClick={onClick}>
    {text}
    {cross
    && (
    <TagIconWrap onClick={onCrossClick}>
      <CrossIcon />
    </TagIconWrap>
    )}
  </TagWrap>
);

const TagWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin: 0px 16px 14px 0px;
  padding: 8px 13px 8px 14px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: rgba(255, 255, 255, 0);
  white-space: nowrap;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

const TagIconWrap = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 10px;
  margin-right: -6px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export default Tag;
