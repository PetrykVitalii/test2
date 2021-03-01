import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectCatalog } from '@/store/selectors/catalog';

import useLanguage from '@/components/common/hooks/useLanguage';

import LinkIcon from '@/components/common/icons/LinkIcon';
import DeleteIcon from '@/components/common/icons/DeleteIcon';

interface Props {
  openModal: () => void;
  closePopup: () => void;
}

const Popup: React.FC<Props> = ({ openModal, closePopup }) => {
  const [{ catalogs }] = useLanguage();
  const catalog = useSelector(selectCatalog);

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleModal = () => {
    openModal();
    closePopup();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current) {
      if (!popupRef.current.contains(e.target as HTMLDivElement)) {
        closePopup();
      }
    }
  };

  if (catalog === null) return null;

  return (
    <Wrapper ref={popupRef}>
      <StyledLink className="catalog preview-btn" href={catalog.short_link} target="_blank">
        <IconWrap>
          <LinkIcon />
        </IconWrap>
        <Text>{catalogs.btn_preview}</Text>
      </StyledLink>
      {!catalog.is_default && (
        <Row onClick={handleModal}>
          <IconWrap>
            <DeleteIcon />
          </IconWrap>
          <Text>{catalogs.btn_delete}</Text>
        </Row>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 56px;
  right: 16px;
  width: 199px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.32);
  background-color: #ffffff;
  padding: 8px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
`;

export default Popup;
