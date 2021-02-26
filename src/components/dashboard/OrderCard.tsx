import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Deliveries } from '@/store/reducers/dashboard';
import { countItemLn } from '@/utils/dashboardLan';
import code from '@/utils/code';

import useLanguage from '@/components/common/hooks/useLanguage';

import Rectangle from '@/components/dashboard/Rectangle';
import Status from '@/components/dashboard/Status';

interface Props {
  text: string;
  data: Deliveries[];
}

const OrderCard: React.FC<Props> = ({ text, data }) => {
  const [{ common }] = useLanguage();
  const history = useHistory();

  const redirectToOrder = (id: number | string) => history.push(`/orders/${id}`);

  return (
    <>
      {data.length > 0 && (
        <Wrapper>
          <Text>{text}</Text>
          {data.map((item) => (
            <RectWrap key={item.order.id}>
              <Rectangle
                classTracking="orders order-details"
                text={item.order.business_name ? item.order.business_name : item.order.full_name}
                subText={
                  item.items !== null
                    ? `${`${code(item.order.code)} • ${item.items.length}`} ${countItemLn(
                      item.items.length,
                      common,
                    )}`
                    : `0 ${countItemLn(0, common)}`
                }
                leftIcon={<Status status={item.order.status} />}
                height="72px"
                onClick={() => redirectToOrder(item.order.code)}
              />
            </RectWrap>
          ))}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin: 0;
  }
`;

const RectWrap = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin: 0;
  }
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

export default OrderCard;
