/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import BackIcon from '@/components/common/icons/BackIcon';
import { selectIsCustomPrice, selectItem, selectLoading } from '@/store/selectors/items';
import BoxIcon from '@/components/common/icons/BoxIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById, itemsActions } from '@/store/actions/items';
import { RouteComponentProps } from 'react-router';
import Loader from '@/components/Loader';
import useLanguage from '@/components/common/hooks/useLanguage';
import unitsLan from '@/utils/unitsLan';
import { calculateItemPrice } from '@/utils/item-price';
import { selectCatalog, selectIsError } from '@/store/selectors/catalog';
import NoValidLink from '@/components/NoValidLink';

interface Props extends RouteComponentProps<{ itemId: string, catalogId: string }> {}

const ItemDetails: React.FC<Props> = ({ match, history }) => {
  const { itemId } = match.params;
  const { catalogId } = match.params;
  const item = useSelector(selectItem);
  const isLoading = useSelector(selectLoading);
  const isCustomPrice = useSelector(selectIsCustomPrice);
  const isError = useSelector(selectIsError);
  const catalog = useSelector(selectCatalog);
  const [{ catalog: catalogLan, common }] = useLanguage();

  const [current, setCurrent] = React.useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemById(+itemId, catalogId));
    return () => {
      dispatch(itemsActions.clearItem());
      dispatch(itemsActions.loading(false));
    };
  }, []);

  const toBack = () => history.goBack();

  const calculatePrice = () => calculateItemPrice(
    isCustomPrice,
    item.custom_price,
    item.price,
    catalogLan.price_on_request,
    item.currency_iso,
  );

  const images = item.images?.split(',');

  if (!isLoading) {
    return <Loader scale="0.5" />;
  }

  if (isError || !catalog.seller_catalog.is_public) {
    return (
      <NoValidLink
        text={isError ? common.link : common.lock}
        src={isError ? '/assets/smile.png' : '/assets/lock.png'}
      />
    );
  }

  return (
    <>
      <Header>
        <TopButton onClick={toBack}>
          <BackIcon />
        </TopButton>
        <ItemName>{item.name.toLowerCase()}</ItemName>
      </Header>
      <ItemContainer>
        {item.images ? (
          <>
            <Carousel
              onChange={setCurrent}
              value={current}
              keepDirectionWhenDragging
              draggable={images.length > 1}
            >
              {images.map((image, index) => (
                <Image src={image} key={index} alt="ItemImage" />
              ))}
            </Carousel>
            {images.length > 1 && (
            <StyledDots>
              <Dots onChange={setCurrent} value={current} number={images.length} />
            </StyledDots>
            )}
          </>
        ) : (
          <EmptyImageWrap>
            <EmptyContent>
              <BoxIcon />
              <EmptyImageText>{catalogLan.no_item_image}</EmptyImageText>
            </EmptyContent>
          </EmptyImageWrap>
        )}

        <WrapInfo>
          <ItemUnit>
            <Span>{calculatePrice()}</Span>
            {` / ${
              item.unit === 'Custom' ? item.custom_unit_name : unitsLan(item.unit, common)
            }`}
          </ItemUnit>
          <ItemCode>{item.code ? `${catalogLan.item_code_header}: ${item.code}` : ''}</ItemCode>
          <ItemDescription>{item.description ? item.description : '- - -'}</ItemDescription>
        </WrapInfo>
      </ItemContainer>
    </>
  );
};

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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WrapInfo = styled.div`
  padding: 0px 24px 50px 24px;
`;

const EmptyContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const EmptyImageText = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  padding-top: 10px;
  color: #b4babf;
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

const StyledDots = styled.div`
  padding: 15px;

  .BrainhubCarousel__dot {
    background-color: transparent;
    padding: 3px;

    &:before {
      width: 6px;
      height: 6px;
    }
  }
`;

export default ItemDetails;
