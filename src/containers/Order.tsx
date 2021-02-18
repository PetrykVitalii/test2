/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import useToggle from '@/components/common/hooks/useToggle';

import { checkCurrency } from '@/utils/currency';
import QuestionIcon from '@/components/common/icons/QuestionIcon';
import OrderItems from '@/components/order/OrderItems';
import ModalOrder from '@/components/order/ModalOrder';
import { selectCatalog } from '@/store/selectors/catalog';
import {
  allPrice, delivery, tax, total,
} from '@/utils/price';
import { selectUserItems } from '@/store/selectors/user';
import useLanguage from '@/components/common/hooks/useLanguage';
import { userActions } from '@/store/actions/user';
import PopUp from '@/components/PopUp';
import BackIcon from '@/components/common/icons/BackIcon';
import LocalStorage from '@/utils/local-storage';
import useInput from '@/components/common/hooks/useInput';
import SearchIcon from '@/components/common/icons/SearchIcon';
import search from '@/utils/search';
import Plus from '@/components/common/icons/Plus';
import useFocusInput from '@/components/common/hooks/useFocusInput';
import { itemsActions } from '@/store/actions/items';
import formatPrice from '@/utils/formatPrice';

interface Props extends RouteComponentProps<{catalogId: string}> {}

const Order: React.FC<Props> = ({ history, match }) => {
  const items = useSelector(selectUserItems);
  const { catalogId } = match.params;
  const [{ order, common, catalog }] = useLanguage();
  const [showModal, setShowModal] = useToggle();
  const [isPopUp, setIsPopUp] = useToggle();
  const [searchValue, setSearch] = useInput();
  const [isFocus, setIsFocus] = useToggle();
  const [inputRef, focusInput] = useFocusInput();
  const {
    seller_catalog: {
      min_order_value,
      standart_charge,
      tax_amount,
      name: catalogName,
      is_default,
      is_custom_pricing_enabled,
    },
    currency_iso,
    business_name,
  } = useSelector(selectCatalog);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const handleOpenModal = () => {
    if (items.filter((item) => item.count).length > 0) setShowModal(true);
    else {
      setIsPopUp(true);
    }
  };

  const nextModal = () => {
    const filterItems = items.filter((item) => item.count > 0);
    if (filterItems.length > 0) {
      dispatch(userActions.setUserItems(filterItems));
      LocalStorage.setUserItems(filterItems);
      dispatch(itemsActions.clearItemInfo());
      window.dataLayer.push({
        event: 'agoraBuyerCart',
        formName: 'Agora Buyer Cart',
      });

      history.push(`/${catalogId}/delivery-date`);
    } else {
      setIsPopUp(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const calculatePrice = (): number => allPrice(items, is_custom_pricing_enabled);

  const calculateDelivery = () => delivery(
    min_order_value,
    standart_charge,
    items,
    order.free,
    is_custom_pricing_enabled,
  );

  const calculateTax = () => tax(
    tax_amount,
    items,
    is_custom_pricing_enabled,
  );

  const calculateTotal = (): number => total(calculateDelivery, calculateTax, calculatePrice);

  const totalItemsText = () => {
    const text = order.total_item.replace('{count}', items.length.toString());
    if (items.length > 1) {
      return text.replace('Item', 'Items');
    }
    return text;
  };

  const focus = (status: boolean) => () => {
    setIsFocus(status);
    if (status) {
      focusInput();
    } else {
      inputRef.current!.blur();
    }
  };

  const searchItems = useMemo(
    () => search(items, searchValue, ({ name }) => name),
    [items, searchValue],
  );

  const clearSearch = () => {
    setSearch('');
    setIsFocus(false);
    inputRef.current!.blur();
  };

  return (
    <>
      <Header>
        {(searchValue || isFocus) ? (
          <PlusWrap onClick={clearSearch}>
            <Plus />
          </PlusWrap>
        )
          : (
            <TopButton onClick={history.goBack}>
              <BackIcon />
            </TopButton>
          )}
        {!isFocus && !searchValue && (
          <TitleWrap onClick={focus(true)}>
            <Title>{order.select_quantity}</Title>
            <SubTitle>
              {is_default ? business_name : catalogName}
            </SubTitle>
          </TitleWrap>
        )}
        <SearchItem
          onBlur={focus(false)}
          onFocus={focus(true)}
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={setSearch}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="on"
        />
        <TopButton className="buyer order search-btn" onClick={focus(true)}>
          <SearchIcon />
        </TopButton>
      </Header>
      <Empty />
      <Main>
        <ItemsWrap>
          {(!isFocus || searchValue.length > 2) && searchItems.map((item) => (
            <OrderItems
              catalogId={catalogId}
              isCustomPrice={is_custom_pricing_enabled}
              key={item.id}
              item={item}
            />
          ))}
        </ItemsWrap>
        <EmptyBig />
        <TotalItems>
          <WrapPrice>
            <WrapSub>
              <Sub>{order.total_including_fees}</Sub>
              <InfoIconWrap className="buyer order subtotal-info-btn" onClick={handleOpenModal}>
                <QuestionIcon />
              </InfoIconWrap>
            </WrapSub>
            <Price>
              {`${checkCurrency(
                currency_iso,
              )}${formatPrice(calculateTotal())}`}
            </Price>
          </WrapPrice>
          <Wrap>
            <ItemsSelected>{totalItemsText()}</ItemsSelected>
            <Cotinue className="buyer order order-list cta-continue" onClick={nextModal}>{common.btn_continue}</Cotinue>
          </Wrap>
        </TotalItems>
      </Main>
      {isPopUp && <PopUp text={catalog.please_select} setIsPopUp={setIsPopUp} />}
      {showModal && (
        <ModalOrder
          catalogId={catalogId}
          delivery={calculateDelivery}
          iso={checkCurrency(currency_iso)}
          closeModal={handleCloseModal}
          allPrice={calculatePrice}
          taxRate={tax_amount}
          taxAmount={calculateTax}
          total={calculateTotal}
        />
      )}
    </>
  );
};

const TopButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const SearchItem = styled.input`
  grid-area: input / input / input / input;
  width: 100%;
  padding: 0px 24px 0 22px;
  height: 24px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: #21272e;
  border: none;
  outline: none;
  &::placeholder{
    color: #b4babf;
  }
`;

const InfoIconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 10px;
  cursor: pointer;
`;

const ItemsWrap = styled.div`
  padding: 24px 0;
`;

const WrapPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: solid 1px #ebeced;
  border-top: solid 1px #ebeced;
`;

const WrapSub = styled.div`
  display: flex;
  align-items: center;
`;

const Sub = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: right;
  color: #21272e;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 16px;
`;

const ItemsSelected = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
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
  z-index: 2;
  grid-area: input / input / input / input;
  height: 100%;
  padding: 0 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PlusWrap = styled.div`
  cursor: pointer;
  width: 18px;
  height: 18px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 100%;
  padding: 0 16px 16px;
  background-color: white;
`;

const Empty = styled.div`
  height: 72px;
`;

const EmptyBig = styled.div`
  height: 116px;
`;

const Cotinue = styled.div`
  min-width: 131px;
  height: 44px;
  margin: 0 0 1px;
  padding: 12px 30px 12px;
  border-radius: 6px;
  background-image: linear-gradient(109deg, #ff474d, #fa4353);
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.3px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const TotalItems = styled.div`
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  z-index: 100;
  bottom: 0;
  min-height: 116px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 552px;
`;

const Header = styled.div`
  height: 72px;
  padding: 12px 24px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.17);
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  z-index: 100;
  max-width: 552px;
  flex-grow: 3;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-template-areas: "left input right";
  align-items: center;
`;

export default Order;
