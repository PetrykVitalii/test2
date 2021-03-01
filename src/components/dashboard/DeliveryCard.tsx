import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';

import { Deliveries } from '@/store/reducers/dashboard';

import IndicatorMultiple from '@/components/common/icons/dashboard/IndicatorMultiple';
import {
  countItemLn,
  monthLn,
  dayWeekShortLn,
  statusLn,
} from '@/utils/dashboardLan';
import code from '@/utils/code';

import useLanguage from '@/components/common/hooks/useLanguage';

import Rectangle from '@/components/dashboard/Rectangle';
import Status from '@/components/dashboard/Status';
import Select from '@/components/dashboard/Select';
import SelectCard from '@/components/dashboard/SelectCard';

interface Props {
  text: string;
  data: any[];
}

const DeliveryCard: React.FC<Props> = ({ text, data }) => {
  const [{ dashboard, common }] = useLanguage();
  const history = useHistory();

  const TODAY_DATE = moment().format('ddd D MMMM YYYY');
  const [day, date, month] = text.split(' ');

  const redirectToOrder = (id: number | string) => history.push(`/orders/${id}`);

  return (
    <>
      {data.length > 0 && (
        <>
          <StickyWrap>
            <Text isRed={text === TODAY_DATE}>
              {text === TODAY_DATE ? `${dashboard.delivery_today}, ${date} ${monthLn(month, common)}` : `${dayWeekShortLn(day, common)}, ${date} ${monthLn(month, common)}`}
            </Text>
          </StickyWrap>
          <Wrapper>
            {data.map((obj, idx) => (
              <Wrap key={idx}>
                {obj.type === 'solo' ? (
                  <RectWrap key={idx}>
                    <Rectangle
                      classTracking="deliveries order-details"
                      text={obj.orders.order.business_name
                        ? obj.orders.order.business_name
                        : obj.orders.order.full_name}
                      subText={obj.orders.items !== null
                        ? `${`${code(obj.orders.order.code)} • ${obj.orders.items.length}`} ${countItemLn(obj.orders.items.length, common)}`
                        : `0 ${countItemLn(0, common)}`}
                      leftIcon={<Status status={obj.orders.order.status} />}
                      height="72px"
                      onClick={() => redirectToOrder(obj.orders.order.code)}
                    />
                  </RectWrap>
                ) : (
                  <RectWrap key={idx}>
                    <Select
                      classTrackingCollapse="deliveries customer-panel-collapse"
                      classTrackingExpand="deliveries customer-panel-expand"
                      icon={<IndicatorMultiple />}
                      title={obj.customer_full_name}
                      text={`${obj.orders.length} ${dashboard.orders}`}
                      selectContent={(
                        <>
                          {obj.orders.map((order: Deliveries) => (
                            <SelectCard
                              classTracking="deliveries order-details"
                              key={order.order.id}
                              title={`${code(order.order.code)}`}
                              text={`${statusLn(order.order.status, common)} • ${order.items?.length} ${countItemLn(order!.items!.length, common)}`}
                              icon={<Status status={order.order.status} />}
                              onClick={() => redirectToOrder(order.order.code)}
                              isAlignCenter
                            />
                          ))}
                        </>
                      )}
                    />
                  </RectWrap>
                )}
              </Wrap>
            ))}
          </Wrapper>
        </>
      )}
    </>
  );
};

const StickyWrap = styled.div`
  height: 35px;

  background-color: #ffffff;
  border-bottom: 1px solid#e3e3e3;

  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Wrapper = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #e3e3e3;
`;

const Wrap = styled.div`
  margin-bottom: 16px;

  &:last-child{
    margin: 0;
  }
`;

const RectWrap = styled.div`
  margin-bottom: 16px;

  &:last-child{
    margin: 0;
  }
`;

const Text = styled.p<{ isRed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${({ isRed }) => isRed ? '#f43939' : '#909599'};
`;

export default DeliveryCard;
