/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import uniqBy from 'lodash/uniqBy';

import { getDeliveryOrders } from '@/store/actions/dashboard';
import { selectDeliveries } from '@/store/selectors/dashboard';
import { groupBy, mapValues, mapValuesToArray } from '@/utils/groupBy';
import { Deliveries as MyDeliveries } from '@/store/reducers/dashboard';
import search from '@/utils/search';

import useLanguage from '@/components/common/hooks/useLanguage';
import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';

import SearchIcon from '@/components/common/icons/SearchIcon';
import BackIcon from '@/components/common/icons/BackIcon';

import DeliveryCard from '@/components/dashboard/DeliveryCard';
import Loader from '@/components/common/Loader';
import FixedHeader from '@/components/FixedHeader';

const Deliveries: React.FC = () => {
  const [{ dashboard, common }] = useLanguage();
  const history = useHistory();
  const dispatch = useDispatch();
  const [groupedData, setGroupedData] = useState<any>(null);

  const deliveries = useSelector(selectDeliveries);

  const [inputValue, setInputValue] = useInput();

  const [isFocused, setIsFocused] = useToggle();

  const handleCloseInput = () => setIsFocused(false);

  const handleClickinput = () => setIsFocused(true);

  const searchData = () => {
    if (!deliveries) return [];

    if (inputValue.startsWith('#')) {
      if (inputValue.length === 1) return deliveries;
      const formatInput = inputValue.replace('#', '').toLowerCase();
      const searchedByCode = deliveries.filter(({ order }) => order.code.replace('#', '').toLowerCase().startsWith(formatInput));
      return searchedByCode;
    }

    const searchedByName = search(deliveries, inputValue, ({ order }) => order.full_name);
    const searchedByBusiness = search(deliveries, inputValue, ({ order }) => order.business_name ? order.business_name : '');
    const searchedByCode = search(deliveries, inputValue, ({ order }) => order.code ? order.code : '');

    const value = uniqBy(
      [...searchedByBusiness, ...searchedByName, ...searchedByCode],
      ({ order }) => order.id,
    );

    return value;
  };

  const filteredData = searchData();

  const handleBack = () => history.push('/dashboard');

  useEffect(() => {
    if (deliveries !== null) {
      const compare = filteredData.slice().sort((a, b) => a.delivery_date - b.delivery_date);

      const items = groupBy(compare, (data: MyDeliveries) => {
        return moment(data.delivery_date).format('ddd D MMMM YYYY');
      });

      const mapped = mapValues(items, (subOrders: any) => {
        const grouped = groupBy(subOrders, (item: any) => {
          return item.order.customer_id;
        });

        const groupedMapped = mapValuesToArray(grouped, (groupedByCustomerId: any) => {
          const ordersByCustomerId = grouped[Object.keys(grouped)[0]];

          const { order } = groupedByCustomerId[0];
          const customerFullName = order.business_name ? order.business_name : order.full_name;

          if (ordersByCustomerId.length === 1) {
            return {
              type: 'solo',
              customer_full_name: customerFullName,
              orders: ordersByCustomerId[0],
            };
          }
          return {
            type: 'multiple',
            customer_full_name: customerFullName,
            orders: ordersByCustomerId,
          };
        });
        return groupedMapped;
      });
      setGroupedData(mapped);
    }
  }, [deliveries, inputValue]);

  useEffect(() => {
    dispatch(getDeliveryOrders());
  }, []);

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <BackIconWrap onClick={handleBack}>
            <BackIcon />
          </BackIconWrap>
          {isFocused && (
            <SearchInput
              onBlur={handleCloseInput}
              value={inputValue}
              placeholder={common.search}
              onChange={setInputValue}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
              autoFocus
            />
          )}
          {(!isFocused || inputValue.length < 0) && (
            <Title>{dashboard.deliveries_header}</Title>
          )}
          <SearchIconWrap className="deliveries search-btn" onClick={handleClickinput}>
            <SearchIcon />
          </SearchIconWrap>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView>
        {deliveries === null ? (
          <Loader scale="0.5" />
        ) : (
          <>
            {groupedData !== null && (
              Object.keys(groupedData).map((key) => (
                <DeliveryCard
                  key={key}
                  data={groupedData[key]}
                  text={key}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

const HeaderWrap = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ScrollView = styled.div`
  min-height: calc(100vh - 72px);
  overflow-y: auto;
  background: #fff;
  padding-top: 72px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const BackIconWrap = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SearchIconWrap = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  height: 30px;
  font-weight: bold;
  line-height: 1.5;
  font-size: 16px;

  :focus {
    outline: none;
  }
`;

export default Deliveries;
