import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { ICatalog } from '@/store/reducers/catalogs';

import useLanguage from '@/components/common/hooks/useLanguage';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';

interface Props {
  catalog: ICatalog;
}

const Alert: React.FC<Props> = ({ catalog }) => {
  const [{ catalogs }] = useLanguage();

  const history = useHistory();

  const redirectToEditCatalog = () => history.push(`/catalogs/${catalog.id}/business-details`);

  return (
    <Wrapper onClick={redirectToEditCatalog} className="catalog-list add-details">
      <Image src="/assets/money-bag.png" alt="money" />
      <View>
        <Text>{catalogs.add_details_label}</Text>
        <IconWrap>
          <SmallArrowIcon color=" #21272e" />
        </IconWrap>
      </View>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #f5f6f7;
  margin-top: 16px;
  padding: 13px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  min-width: 28px;
  max-width: 28px;
  min-height: 37px;
  max-height: 37px;
  object-fit: contain;
  margin-right: 14px;
`;

const IconWrap = styled.div`
  width: 16px;
  height: 16px;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
  margin-right: 36px;
`;

const View = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default Alert;
