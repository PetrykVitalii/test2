import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { selectPlaceholder } from '@/store/selectors/user';
import { FullItem } from '@/store/reducers/items';
import formatPrice from '@/utils/formatPrice';

import unitsLan from '@/utils/unitsLan';
import useLanguage from '@/components/common/hooks/useLanguage';
import InputCurrency from '@/components/InputCurrency';
import EmptyImageIcon from '@/components/common/icons/EmptyImageIcon';

interface Props {
  item: FullItem;
  isEditable: boolean;
  onChange: (id: number) => (value: string) => void;
  price: number | null;
  customPrice: number | null;
  handleFocusInput?: () => void;
  handleBlurInput?: () => void;
}

const CardItem: React.FC<Props> = ({
  item,
  isEditable,
  onChange,
  price,
  customPrice,
  handleFocusInput,
  handleBlurInput,
}) => {
  const [{ common }] = useLanguage();
  const history = useHistory();

  const currencyPlaceholder = useSelector(selectPlaceholder);

  return (
    <Wrapper>
      <ItemWrap onClick={() => history.push(`/item-details/${item.id}`)}>
        {item.images && item.images.length > 0 ? (
          <ItemImage isListed={item.is_listed}>
            <Image src={item.images.split(',')[0]} alt="item-image" />
          </ItemImage>
        ) : (
          <ItemEmptyImage isListed={item.is_listed}>
            <EmptyImageIcon />
          </ItemEmptyImage>
        )}
        <TextWrap>
          <Text isListed={item.is_listed}>{item.name.toLowerCase()}</Text>
          <SubText isListed={item.is_listed}>{`${item.custom_unit_name ? item.custom_unit_name.toLowerCase() : unitsLan(item.unit, common)}`}</SubText>
        </TextWrap>
      </ItemWrap>
      {isEditable ? (
        <InputWrap>
          <InputCurrency
            isThin
            value={customPrice || ''}
            onChange={onChange(item.id)}
            placeholder={currencyPlaceholder}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
          />
        </InputWrap>
      ) : (
        <Price isListed={item.is_listed}>{`${currencyPlaceholder.split(' ')[0]}${price ? formatPrice(price) : 0}`}</Price>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 64px;

  &:last-child {
    margin-bottom: 16px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ItemImage = styled.div<{ isListed: boolean }>`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 6px;
  opacity: ${({ isListed }) => isListed ? '1' : '0.4'};
  box-shadow: 0 4px 10px -4px rgba(33, 39, 46, 0.4);
  background-color: white;
`;

const ItemEmptyImage = styled.div<{ isListed: boolean }>`
  min-width: 48px;
  max-width: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #fcfcfc;
  opacity: ${({ isListed }) => isListed ? '1' : '0.4'};
  border: solid 1px rgba(33, 39, 46, 0.12);
`;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  width: 100%;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  margin-left: 17px;
  width: calc(100% - 65px);
`;

const Text = styled.p<{ isListed: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: ${({ isListed }) => isListed ? '#21272e' : '#909599'};
  text-transform: capitalize;

  word-wrap: break-word;
  
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const SubText = styled.p<{ isListed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ isListed }) => isListed ? ' #787c80' : '#b4babf'};
  text-transform: capitalize;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Price = styled.p<{ isListed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: ${({ isListed }) => isListed ? '#21272e' : '#909599'};
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 40px;
  white-space: nowrap;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  max-width: 128px;
  min-width: 128px;
  margin-left: 8px;
`;

export default CardItem;
