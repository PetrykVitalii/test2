/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import uniqBy from 'lodash/uniqBy';

import {
  selectFilteredOrders,
  selectIsLoading,
  selectIsUpcomingDeliveriesOnly,
  selectStatusFilters,
} from '@/store/selectors/dashboard';
import { selectUserItems } from '@/store/selectors/items';

import { dashboardActions, getFilteredOrders } from '@/store/actions/dashboard';

import { groupBy } from '@/utils/groupBy';
import { Status } from '@/utils/selectOrderStatus';
import { statusLn, monthLn } from '@/utils/dashboardLan';

import { SortFilters } from '@/store/reducers/dashboard';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';
import useInput from '@/components/common/hooks/useInput';
import search from '@/utils/search';

import FilterIcon from '@/components/common/icons/FilterIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import CrossIcon from '@/components/common/icons/CrossIcon';
import SortIcon from '@/components/common/icons/SortIcon';
import Loader from '@/components/common/Loader';
import Tag from '@/components/common/Tag';

import SortFilter from '@/components/dashboard/SortFilter';
import OrderCard from '@/components/dashboard/OrderCard';
import Navigation from '@/components/Navigation';
import FixedHeader from '@/components/FixedHeader';

interface Props extends RouteComponentProps<{ id: string }> {}

const Orders: React.FC<Props> = ({ location }) => {
  const [{ dashboard, common }] = useLanguage();
  const history = useHistory();
  const dispatch = useDispatch();

  const [grouped, setGrouped] = useState<any>(null);

  const filteredOrders = useSelector(selectFilteredOrders);
  const isLoading = useSelector(selectIsLoading);
  const userItems = useSelector(selectUserItems);

  const [inputValue, setInputValue] = useInput();
  const [isFocused, setIsFocused] = useToggle();

  const showUpcomingDeliveriesOnly = useSelector(selectIsUpcomingDeliveriesOnly);
  const statusFilters = useSelector(selectStatusFilters);

  const [isShowSortModal, setIsShowSortModal] = useToggle();
  const [filter, setFilter] = useState<SortFilters>(SortFilters.DELIVERY_DATE);

  useEffect(() => {
    if (filteredOrders !== null) {
      let compare = filteredData!.slice().sort((a, b) => +b.order.created_at - +a.order.created_at);

      if (statusFilters.length) {
        const filters = statusFilters.map((status) => status.key.toLowerCase().trim());
        compare = compare.filter((order) => filters.includes(
          order.order.status.toLowerCase().trim(),
        ));
      }

      if (showUpcomingDeliveriesOnly) {
        compare = compare.filter((order) => order.delivery_date >= moment(new Date()).startOf('day').valueOf());
      }

      const temp = compare.map((delivery) => {
        return {
          items: delivery.items,
          order: {
            ...delivery.order,
            created_at: moment(delivery.order.created_at).format('MMMM YYYY'),
            delivery_date: moment(delivery.order.delivery_date).format(
              'DD MMMM',
            ),
          },
          delivery_date: delivery.delivery_date,
        };
      });

      let group = groupBy(temp, (date: any) => date.order.created_at);
      if (showUpcomingDeliveriesOnly && filter === SortFilters.DELIVERY_DATE) {
        group = groupBy(temp, (date: any) => date.order.delivery_date);
      }

      setGrouped(group);
    }
  }, [filteredOrders, inputValue, statusFilters, showUpcomingDeliveriesOnly, filter]);

  interface Query {
    dateFrom: string;
    dateTill: string;
  }

  useEffect(() => {
    const qParams = location.search
      .slice(1)
      .split('&')
      .reduce(
        (a: Query, i: string) => {
          const [x, y] = i.split('=') as [keyof Query, string];
          a[x] = y;
          return a;
        },
        { dateFrom: '', dateTill: '' },
      ) || { dateFrom: '', dateTill: '' };
    const {
      dateFrom = Number.MIN_VALUE,
      dateTill = Number.MAX_VALUE,
    } = qParams;
    const rangeType = showUpcomingDeliveriesOnly
      ? SortFilters.DELIVERY_DATE
      : SortFilters.ORDER_DATE;

    if (dateFrom && dateTill && rangeType) {
      dispatch(getFilteredOrders(+dateFrom, +dateTill, rangeType));
    }
  }, []);

  const handleClearAll = () => {
    handleSelectUpcomingDeliveriesOnly(false);
    handleSelectStatusFilters(null);
    dispatch(getFilteredOrders(Number.MIN_VALUE, Number.MAX_VALUE, SortFilters.ORDER_DATE));
  };

  const handleSelectStatusFilters = (d: Status | null) => {
    if (d === null) {
      dispatch(dashboardActions.setStatusFilters([]));
      return;
    }

    const isSelected = statusFilters.includes(d);
    let statuses = statusFilters;
    if (!isSelected) {
      statuses = [...statuses, d];
    } else {
      statuses = statuses.filter((value) => value !== d);
    }

    dispatch(dashboardActions.setStatusFilters(statuses));
  };

  const handleSelectUpcomingDeliveriesOnly = (value: boolean) => {
    dispatch(dashboardActions.setUpcomingDeliveriesOnly(value));
    if (!value) {
      dispatch(getFilteredOrders(Number.MIN_VALUE, Number.MAX_VALUE, SortFilters.ORDER_DATE));
    }
  };

  const tagsCount = () => ((showUpcomingDeliveriesOnly) ? 1 : 0) + statusFilters.length;

  const searchData = () => {
    if (!filteredOrders) return [];

    if (inputValue.startsWith('#')) {
      if (inputValue.length === 1) return filteredOrders;
      const formatInput = inputValue.replace('#', '').toLowerCase();
      const searchedByCode = filteredOrders.filter(({ order }) => order.code.replace('#', '').toLowerCase().startsWith(formatInput));
      return searchedByCode;
    }

    const searchedByName = search(
      filteredOrders,
      inputValue,
      ({ order }) => order.full_name,
    );

    const searchedByBusiness = search(filteredOrders, inputValue, ({ order }) => order.business_name ? order.business_name : '');

    const searchedByCode = search(
      filteredOrders,
      inputValue,
      ({ order }) => order.code ? order.code : '',
    );

    const value = uniqBy(
      [...searchedByBusiness, ...searchedByName, ...searchedByCode],
      ({ order }) => order.id,
    );

    return value;
  };

  const filteredData = searchData();

  const redirectToCatalog = () => history.push('/catalogs');
  const redirectToAddItems = () => history.push('/add-items');

  const handleCloseInput = () => setIsFocused(false);
  const handleClickinput = () => setIsFocused(true);
  const handleClearText = () => setInputValue('');

  const handleShowSortModal = () => setIsShowSortModal(!isShowSortModal);
  const handleBack = () => {
    history.push('/orders/date');
    dispatch(dashboardActions.cleanFilteredOrder());
  };

  const getCustomText = (value: string) => {
    const today = moment(new Date()).format('DD MMMM');
    const tomorrow = moment(new Date()).add(1, 'days').format('DD MMMM');

    const [date, month] = value.split(' ');
    const parsedDate = `${date} ${monthLn(month, common)}`;

    if (today.toLowerCase().trim() === value.toLowerCase().trim()) {
      return `${dashboard.delivery_today}, ${parsedDate}`;
    }

    if (tomorrow.toLowerCase().trim() === value.toLowerCase().trim()) {
      return `${dashboard.delivery_tomorrow}, ${parsedDate}`;
    }

    return `${dashboard.delivery_on} ${parsedDate}`;
  };

  const getNoOrdersView = () => {
    if (userItems && userItems.length === 0) {
      return (
        <>
          <EmojiWrap>
            <Emoji src="/assets/items/raised-hands.png" />
          </EmojiWrap>
          <NoOrders>{dashboard.add_items_first}</NoOrders>
          <NoOrdersText>{dashboard.add_items_first_text}</NoOrdersText>
          <NoOrdersButton
            className="orders empty-order add-items"
            onClick={redirectToAddItems}
          >
            {dashboard.btn_add_items}
          </NoOrdersButton>
        </>
      );
    }
    return (
      <>
        <EmojiWrap>
          <Emoji src="/assets/items/eyes.png" alt="eyes" />
        </EmojiWrap>
        <NoOrders>{dashboard.no_orders_yet}</NoOrders>
        <NoOrdersText>{dashboard.no_orders_text}</NoOrdersText>
        <NoOrdersButton
          className="orders empty-order share-catalogs"
          onClick={redirectToCatalog}
        >
          {dashboard.btn_share_catalogs}
        </NoOrdersButton>
      </>
    );
  };

  if (isLoading) {
    return (
      <ContainerWrap>
        <HeaderWrap>
          <Header>
            <Title>{dashboard.orders_header}</Title>
            <IconsWrap>
              <SearchIconWrap className="orders search-btn">
                <SearchIcon />
              </SearchIconWrap>
              <FilterIconWrap className="orders filter-btn" onClick={handleBack}>
                <FilterIcon />
              </FilterIconWrap>
            </IconsWrap>
          </Header>
        </HeaderWrap>
        <ScrollView>
          <Loader scale="0.5" />
        </ScrollView>
        <Navigation path="orders" />
      </ContainerWrap>
    );
  }

  return (
    <ContainerWrap>
      <FixedHeader>
        <HeaderWrap>
          <Header>
            {(isFocused || inputValue.length > 0) ? (
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
            ) : (<Title>{dashboard.orders_header}</Title>)}
            {!!filteredOrders?.length && (
              <IconsWrap>
                {inputValue.length > 0 ? (
                  <SearchIconWrap
                    className="orders clear-search-btn"
                    onClick={handleClearText}
                  >
                    <CrossIcon width="20" height="20" />
                  </SearchIconWrap>
                ) : (
                  <SearchIconWrap
                    className="orders search-btn"
                    onClick={handleClickinput}
                  >
                    <SearchIcon />
                  </SearchIconWrap>
                )}
                <FilterIconWrap
                  className="orders filter-btn"
                  onClick={handleBack}
                  highlight={tagsCount() > 0}
                >
                  <FilterIcon />
                </FilterIconWrap>
              </IconsWrap>
            )}
          </Header>
          {!!tagsCount() && (
            <TagsWrapper>
              {tagsCount() > 1 && (
              <Tag
                classTracking="orders filter-chips clear-all"
                text={dashboard.clear_all}
                onClick={handleClearAll}
                cross={false}
              />
              )}
              {showUpcomingDeliveriesOnly && (
                <Tag
                  text={dashboard.upcoming_deliveries}
                  onCrossClick={() => handleSelectUpcomingDeliveriesOnly(false)}
                  cross
                />
              )}
              {statusFilters.map((status) => (
                <Tag
                  key={status.key}
                  text={statusLn(status.name, common)}
                  onCrossClick={() => handleSelectStatusFilters(status)}
                  cross
                />
              ))}
            </TagsWrapper>
          )}
        </HeaderWrap>
      </FixedHeader>
      <ScrollView offset={tagsCount() ? 1 : 0}>
        {filteredOrders?.length === 0 ? (
          getNoOrdersView()
        ) : (
          <>
            {showUpcomingDeliveriesOnly && (
            <SortWrap
              className="order sort-orders-btn"
              onClick={handleShowSortModal}
            >
              {dashboard.sort_button}
              <SortIconWrap>
                <SortIcon />
              </SortIconWrap>
            </SortWrap>
            )}

            {grouped === null ? (
              <Loader scale="0.5" />
            ) : (
              Object.keys(grouped)
                .map((date) => {
                  const [first, second] = date.split(' ');
                  const text = showUpcomingDeliveriesOnly && filter === SortFilters.DELIVERY_DATE
                    ? getCustomText(date) : `${dashboard.ordered_in} ${monthLn(first, common)} ${second}`;
                  return (<OrderCard key={date} data={grouped[date]} text={text} />);
                })
            )}

            {isShowSortModal && (
            <SortFilter
              filterItems={filter}
              setFilter={setFilter}
              hideModal={setIsShowSortModal}
            />
            )}
          </>
        )}
      </ScrollView>
      {!isFocused && (
        <Navigation path="orders" />
      )}
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  position: relative;
`;

const HeaderWrap = styled.div`
  width: 100%;
  padding: 0 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollView = styled.div<{ offset?: number }>`
  overflow-y: auto;
  background: #fff;
  padding: 32px 16px;
  /* padding-top: ${({ offset }) => (offset && '110px') || '92px'}; */
  /* padding-bottom: 84px; */
  min-height: calc(100vh - 144px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 224px);
  }
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const IconsWrap = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

`;

const FilterIconWrap = styled.div<{ highlight?: boolean }>`
  margin-left: 12px;
  margin-right: -8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  padding: 8px;
  background: ${({ highlight }) => (highlight && ' #f0f1f2') || 'transparent'};
`;

const SearchIconWrap = styled.div`
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

const EmojiWrap = styled.div`
  width: 62px;
  padding-top: 90px;
  margin: 0 auto 8px;
`;

const Emoji = styled.img`
  width: 62px;
  height: 80px;
  object-fit: contain;
  font-family: AppleColorEmoji;
  font-size: 64px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const NoOrders = styled.div`
  font-size: 24px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const NoOrdersText = styled.div`
  width: 288px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #787c80;
  margin: 8px auto;
`;

const NoOrdersButton = styled.div`
  margin: 72px 24px 25px;
  padding: 16px 0px;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const SortWrap = styled.div`
  position: absolute;
  right: 16px;
  display: flex;
  height: 17px;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3897ff;
  cursor: pointer;
`;

const SortIconWrap = styled.div`
  margin-left: 5px;
`;

export default Orders;
