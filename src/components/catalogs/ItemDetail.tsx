/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrency } from '@/store/selectors/user';
import { selectCatalogItems } from '@/store/selectors/catalog';
import { getCatalogItems } from '@/store/actions/catalog';
import { FullItem } from '@/store/reducers/items';
import useLanguage from '@/components/common/hooks/useLanguage';

import CloseIcon from '@/components/common/icons/CloseIcon';
import InfoIcon from '@/components/common/icons/items/InfoIcon';
import Loader from '@/components/common/Loader';
import unitsLan from '@/utils/unitsLan';
import formatPrice from '@/utils/formatPrice';

interface Props extends RouteComponentProps<{ catalogId: string; itemId: string }> {
}

const ItemDetail: React.FC<Props> = ({ match }) => {
  const history = useHistory();

  const { catalogId, itemId } = match.params;

  const [{ items: itemsLan, common }] = useLanguage();
  const currency = useSelector(selectCurrency);
  const items = useSelector(selectCatalogItems);

  const [item, setItem] = useState<FullItem | null>();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogItems(+catalogId));
  }, []);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const selectedItem = items.find((data: FullItem) => data.id === +itemId);
    if (!selectedItem) {
      return;
    }

    setItem(selectedItem);
    setIsLoading(false);
  }, [items]);

  const toBack = () => history.push(`/catalogs/${catalogId}`);

  return (
    isLoading ? (
      <Loader />
    ) : (
      <>
        <Header>
          <TopButton onClick={toBack}>
            <CloseIcon />
          </TopButton>
          <ItemName>{item && item.name && item.name.toLowerCase()}</ItemName>
        </Header>
        <ItemContainer>
          <InfoWrapper>
            <InfoAmount>
              <InfoIcon />
            </InfoAmount>
            <Text>{itemsLan.info_text}</Text>
          </InfoWrapper>
          <WrapInfo>
            <ItemUnit>
              <Span>
                {`${
                  item && item.custom_price
                    ? `${currency}${formatPrice(item.custom_price)}`
                    : item && item.price
                      ? `${currency}${formatPrice(item.price)}`
                      : `${itemsLan.price_on_request}`
                } / ${
                  item && item.unit === 'Custom'
                    ? item.custom_unit_name
                    : item && unitsLan(item.unit, common)
                }`}
              </Span>
            </ItemUnit>
            <ItemCode>{item && item.code ? `${itemsLan.item_code_header}: #${item.code}` : ''}</ItemCode>
            <ItemDescription>{item && item.description ? item.description : '- - -'}</ItemDescription>
          </WrapInfo>
        </ItemContainer>
      </>
    )
  );
};

const Header = styled.div`
  padding: 12px 12px 12px 20px;
  display: flex;
  align-items: center;
  min-height: 72px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  position: relative;
  z-index: 110;
`;

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ItemName = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  text-align: left;
  margin-left: 24px;
  padding-right: 30px;
  text-transform: capitalize;
  word-break: break-word;
`;

const ItemContainer = styled.div`
  background-color: white;
`;

const WrapInfo = styled.div`
  padding: 0px 24px 50px 24px;
`;

const Span = styled.span`
  text-transform: none;
`;

const ItemUnit = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #21272e;
  margin: 32px 0 12px;
  word-break: break-word;
  text-transform: capitalize;
`;

const ItemCode = styled.div`
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  color: #909599;
  text-transform: uppercase;
`;

const ItemDescription = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: 0.3px;
  color: #21272e;
  margin: 34px 0 10px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const InfoWrapper = styled.div`
  margin: 24px 16px 32px 16px;
  padding: 18px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
`;

const Text = styled.div`
  margin-left: 16px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #787c80;
`;

const InfoAmount = styled.div`
  width: 28px;
  height: 28px;
`;

export default ItemDetail;
