import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import moment from 'moment';

import { QuoteState } from '@/store/reducers/dashboard';
import { countItemLn } from '@/utils/dashboardLan';

import useLanguage from '@/components/common/hooks/useLanguage';

import IndicatorMultiple from '@/components/common/icons/dashboard/IndicatorMultiple';
import Select from '@/components/dashboard/Select';
import SelectCard from '@/components/dashboard/SelectCard';

interface Props {
  data: QuoteState[];
  isOpen: boolean;
}

const PastRequests: React.FC<Props> = ({ data, isOpen }) => {
  const [{ common, dashboard }] = useLanguage();
  const history = useHistory();

  const redirectToQuote = (id: number) => history.push(`/quote-requests/${id}`);
  return (
    <>
      {data.length > 0 && (
        <>
          <Wrapper>
            <Wrap>
              <RectWrap>
                <Select
                  classTrackingCollapse="deliveries customer-panel-collapse"
                  classTrackingExpand="deliveries customer-panel-expand"
                  icon={<IndicatorMultiple />}
                  title={dashboard.past_requests}
                  isSelectOpen={isOpen}
                  selectContent={(
                    <>
                      {data.map(({ quote, items }) => (
                        <SelectCard
                          classTracking="deliveries order-details"
                          key={quote.id}
                          title={quote.full_name}
                          text={items !== null ? `Sent on ${moment(quote.created_at).format('DD MMM')} • ${items.length} ${countItemLn(items.length, common)}` : `0 ${countItemLn(0, common)}`}
                          onClick={() => redirectToQuote(quote.id)}
                          isAlignCenter
                        />
                      ))}
                    </>
                  )}
                />
              </RectWrap>
            </Wrap>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 16px 0 0;
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

export default PastRequests;
