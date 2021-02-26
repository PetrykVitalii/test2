import { itemsToCatalogsActions } from '@/store/actions/items-to-catalogs';
import { AddCatalog } from '@/store/reducers/items-to-catalogs';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import EyeIcon from '@/components/common/icons/catalogs/EyeIcon';
import CheckBoxOffIcon from '../common/icons/CheckBoxOffIcon';
import CheckBoxOnIcon from '../common/icons/CheckBoxOnIcon';
import CheckBoxBlackIcon from '../common/icons/CheckBoxBlackIcon';
import useLanguage from '../common/hooks/useLanguage';

interface Props {
  catalog: AddCatalog;
}

const CatalogCard: React.FC<Props> = ({ catalog }) => {
  const [{ catalogs }] = useLanguage();

  const dispatch = useDispatch();

  const changeActive = () => {
    dispatch(itemsToCatalogsActions.changeToggleCatalog(catalog.id));
  };

  return (
    <CatalogCardWrap>
      <CatalogImage>
        <Image src={catalog.category.image_url} alt={catalog.category.name} />
      </CatalogImage>
      <CatalogInfo isPublic={!!catalog.is_public}>
        <Title>
          {!catalog.is_default
            ? catalog.name.toLowerCase()
            : catalogs.all_items_header}
        </Title>
        {!catalog.is_public && (
          <HidenInfo>
            <IconWrap>
              <EyeIcon />
            </IconWrap>
            <HidenText>{catalogs.hidden_label}</HidenText>
          </HidenInfo>
        )}
      </CatalogInfo>
      {!catalog.is_default ? (
        <WrapCheckBox
          className="item select-catalog checkbox"
          onClick={changeActive}
          isActive={!!catalog.isAddStatus}
        >
          {catalog.isAddStatus ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
        </WrapCheckBox>
      ) : (
        <WrapCheckBox isActive={!catalog.isAddStatus}>
          <CheckBoxBlackIcon />
        </WrapCheckBox>
      )}
    </CatalogCardWrap>
  );
};

const IconWrap = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HidenText = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
  margin-left: 5px;
`;

const WrapCheckBox = styled.div<{isActive: boolean}>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  padding: ${({ isActive }) => (!isActive ? '2px' : '0px')};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HidenInfo = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const CatalogInfo = styled.div<{isPublic: boolean}>`
  padding: 13px 0;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  justify-content: ${({ isPublic }) => isPublic ? 'center' : 'space-between'};
  width: calc(100% - 160px);
  height: 72px;
`;

const CatalogImage = styled.div`
  height: 72px;
  width: 96px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

const CatalogCardWrap = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  margin: 16px 0;
`;

export default CatalogCard;
