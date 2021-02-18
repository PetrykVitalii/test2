/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ChangeEvent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import BackIcon from '@/components/common/icons/BackIcon';
import Button from '@/components/Button';
import ItemsContainer from '@/components/ItemsContainer';
import TextArea from '@/components/TextArea';
import { selectCatalog } from '@/store/selectors/catalog';
import { checkCurrency } from '@/utils/currency';
import {
  allPrice, delivery, total, tax,
} from '@/utils/price';
import { selectOrder, selectUser, selectUserItems } from '@/store/selectors/user';
import { userActions } from '@/store/actions/user';
import { sendOrder } from '@/store/actions/order';
import useLanguage from '@/components/common/hooks/useLanguage';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { selectIsLoading } from '@/store/selectors/order';
import formatPrice from '@/utils/formatPrice';
import formatTextArea from '@/utils/formatTextArea';

interface Props extends RouteComponentProps<{catalogId: string}> {}

const Review: React.FC<Props> = ({ history, match }) => {
  const { catalogId } = match.params;
  const {
    seller_catalog: {
      min_order_value,
      standart_charge,
      tax_amount,
      is_default,
      name,
      is_custom_pricing_enabled,
      is_delivery_date_choosable,
    },
    currency_iso,
    business_name,
  } = useSelector(selectCatalog);
  const items = useSelector(selectUserItems);
  const user = useSelector(selectUser);
  const order = useSelector(selectOrder);
  const isLoading = useSelector(selectIsLoading);
  const [{ order: orderLan, common }] = useLanguage();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const send = () => {
    dispatch(sendOrder(catalogId, common.lan_order));
  };

  const calculateTax = (): number => tax(tax_amount, items, is_custom_pricing_enabled);

  const calculatePrice = (): number => allPrice(items, is_custom_pricing_enabled);

  const calculateTotal = (): number => total(calculateDelivery, calculateTax, calculatePrice);

  const calculateDelivery = () => delivery(
    min_order_value,
    standart_charge,
    items,
    orderLan.free,
    is_custom_pricing_enabled,
  );

  const formatDate = () => (common.lan === 'ZH-CN'
    ? moment(order.deliveryDate).locale(common.lan.toLowerCase()).format('dddd, YYYY年 M月 DD日')
    : moment(order.deliveryDate).locale(common.lan.toLowerCase()).format('ddd, DD MMMM YYYY'));

  const changeNotes = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  ) => {
    const { target } = e as ChangeEvent<HTMLInputElement>;
    const { value } = target;
    dispatch(userActions.setNotesOrder(formatTextArea(value)));
  };

  return (
    <PlaceOrderWrap>
      <Header>
        <PlusWrap onClick={history.goBack}>
          <BackIcon />
        </PlusWrap>
        <TitleWrap>
          <Title>{orderLan.order_summary}</Title>
          <SubTitle>
            {is_default ? business_name : name}
          </SubTitle>
        </TitleWrap>
      </Header>
      <Empty />
      <Main>
        <WrapContainer>
          <ItemsContainer classTrackingExpand="buyer order item-details-expand" classTrackingCollapse="buyer order item-details-collapse" isCustomPrice={is_custom_pricing_enabled} isCount items={items} />
        </WrapContainer>
        <Line />
        <Wrap>
          <InfoWrap>
            <Info weight="600" margin="24px 0 13px" color="#787c80">
              {orderLan.sub_total}
            </Info>
            <Info
              weight="600"
              margin="24px 0 13px"
              color="#21272e"
            >
              {`${checkCurrency(
                currency_iso,
              )}${formatPrice(calculatePrice())}`}
            </Info>
          </InfoWrap>
          <InfoWrap>
            <Info weight="600" margin="13px 0 20px" color="#787c80">
              {orderLan.delivery_charges}
            </Info>
            <Info weight="600" margin="13px 0 20px" color="#21272e">
              {`${
                typeof calculateDelivery() !== 'string'
                  ? checkCurrency(currency_iso)
                  : ''
              }${formatPrice(calculateDelivery())}`}
            </Info>
          </InfoWrap>
          {tax_amount && calculateTax() > 0 && (
          <InfoWrap>
            <Info weight="600" margin="13px 0 20px" color="#787c80">
              {`${orderLan.taxes} (${tax_amount}%)`}
            </Info>
            <Info
              weight="600"
              margin="13px 0 20px"
              color="#21272e"
            >
              {`${checkCurrency(
                currency_iso,
              )}${formatPrice(calculateTax())}`}
            </Info>
          </InfoWrap>
          )}
          <Line />
          <InfoWrap>
            <Info weight="bold" margin="19px 0 27px" color="#21272e">
              {orderLan.total}
            </Info>
            <Info
              weight="bold"
              margin="19px 0 27px"
              color="#21272e"
            >
              {`${checkCurrency(
                currency_iso,
              )}${formatPrice(calculateTotal())}`}
            </Info>
          </InfoWrap>
        </Wrap>
        <Line />
        <Wrap>
          <InfoTitle>{orderLan.your_details}</InfoTitle>
          <Info weight="600" margin="16px 0 8px" color="#21272e">
            {user.fullName.toLowerCase()}
          </Info>
          {user.businessName && (
            <Info weight="600" margin="8px 0 8px" color="#21272e">
              {user.businessName.toLowerCase()}
            </Info>
          )}
          <Info weight="600" margin="8px 0 24px" color="#21272e">
            {formatPhoneNumberIntl(`+${user.phoneNumber}`)}
          </Info>
        </Wrap>
        {is_delivery_date_choosable && (
          <>
            <Line />
            <Wrap>
              <InfoTitle>{orderLan.delivery_date}</InfoTitle>
              <Info
                weight="600"
                margin="16px 0 24px"
                color="#21272e"
              >
                {formatDate()}
              </Info>
            </Wrap>
          </>
        )}
        <Line />
        <Wrap>
          <InfoTitle>{orderLan.delivery_details}</InfoTitle>
          <Info weight="600" margin="16px 0 24px" color="#21272e">
            {`${user.businessName ? `${user.businessName.toLowerCase()} • ` : ''}${
              user.adress.toLowerCase()
            } • ${user.city.toLowerCase()} ${user.postCode.toLowerCase()}`}
          </Info>
        </Wrap>
        <Line />
        <WrapTextArea>
          <TextArea
            classTracking="buyer order input-order-notes-field"
            setDescription={changeNotes}
            descriptionValue={order.notesOrder}
            name={orderLan.order_notes}
            placeholder={orderLan.optional}
          />
        </WrapTextArea>
        <WrapButton>
          <Button
            shadow
            classTracking="buyer order cta-place-order"
            isLoading={isLoading}
            onClick={send}
          >
            {orderLan.place_order}
          </Button>
        </WrapButton>
      </Main>
    </PlaceOrderWrap>
  );
};

const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  margin: 24px 0 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #909599;
`;

const Info = styled.div<{color: string, margin: string, weight: string}>`
  font-size: 14px;
  font-weight: ${({ weight }) => weight && weight};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ color }) => color && color};
  margin: ${({ margin }) => margin && margin};
  text-transform: capitalize;
  word-break: break-word;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  height: 1px;
  background-color: #ebeced;
`;

const WrapTextArea = styled.div`
  padding: 0 16px;
  margin: 43px 0 52px;
`;

const Wrap = styled.div`
  padding: 0 16px;
`;

const WrapContainer = styled.div`
  padding: 0 16px 32px;
`;

const WrapButton = styled.div`
  position: fixed;
  width: calc(100% - 32px);
  max-width: 517px;
  bottom: 24px;
  margin: 0px 16px;
`;

const Main = styled.div`
  padding: 43px 0 80px;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  height: 72px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const TitleWrap = styled.div`
  height: 100%;
  margin-left: 24px;
  width: calc(100% - 43px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PlusWrap = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Header = styled.div`
  height: 72px;
  padding: 12px 24px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  max-width: 552px;
`;

const PlaceOrderWrap = styled.div`
  background-color: white;
`;

export default Review;
