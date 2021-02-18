import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import BackIcon from '@/components/common/icons/BackIcon';
import Calendar from '@/components/calendar/Calendar';
import Button from '@/components/Button';
import { Redirect, RouteComponentProps } from 'react-router';
import { selectOrder } from '@/store/selectors/user';
import useLanguage from '@/components/common/hooks/useLanguage';
import PopUp from '@/components/PopUp';
import useToggle from '@/components/common/hooks/useToggle';
import { selectCatalog } from '@/store/selectors/catalog';
import LocalStorage from '@/utils/local-storage';
import { userActions } from '@/store/actions/user';

interface Props extends RouteComponentProps<{catalogId: string}>{

}

const DeliveryDate: React.FC<Props> = ({ history, match }) => {
  const { deliveryDate } = useSelector(selectOrder);
  const {
    seller_catalog: {
      is_delivery_date_choosable: isDeliveryDateChoosable,
      delivery_days: deliveryDays,
    },
  } = useSelector(selectCatalog);
  const { catalogId } = match.params;
  const [{ order, common }] = useLanguage();
  const [isPopUp, setIsPopUp] = useToggle();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  useEffect(() => {
    if (!isDeliveryDateChoosable) {
      return;
    }

    if (deliveryDate === null) {
      let dateOfDelivery: moment.Moment | null = null;
      const dayToday = +moment().isoWeekday();

      // Map the isoWeekDay to deliveryDays format.
      //  (1 = Monday and 7 = Sunday in isoWeekday.) (0 = Moday and 6 = Sunday in deliveryDays)
      const mapDates: any = Object.freeze({
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
      });

      const isDayAvailable = deliveryDays.findIndex((date: number) => date === mapDates[dayToday]);

      /*
        Conditions to check for delivery date availability.
        1. First condition block, selects the only delivery date available in the deliveryDays
          array, iff the deliveryDay[0] is not today.
        2. Second condition block, selects upcoming delivery day, in the array of deliveryDays,
           if the immediate next day is not available for delivery.
        3. Third condition block, selects immediate next day for delivery.
        4. if non of the condition is satisfied, selects the first deliverable day of the next week.
      */
      if (isDayAvailable === -1 && deliveryDays.length === 1
        && deliveryDays[0] !== mapDates[dayToday - 1]) {
        dateOfDelivery = moment().day(deliveryDays[0] + 1);
      } else if (isDayAvailable === -1 && deliveryDays[mapDates[dayToday]] !== undefined) {
        dateOfDelivery = moment().day(deliveryDays[mapDates[dayToday]] + 1);
      } else if (isDayAvailable !== -1 && deliveryDays[isDayAvailable + 1] !== undefined) {
        dateOfDelivery = moment().day(deliveryDays[isDayAvailable + 1] + 1);
      } else {
        dateOfDelivery = moment().add(1, 'weeks').day(deliveryDays[0] + 1);
      }

      changeDate(dateOfDelivery);
    }
  }, [isDeliveryDateChoosable]);

  const changeDate = (select: moment.Moment) => {
    let tempSelectedDate = deliveryDate;

    if (deliveryDate === null) {
      tempSelectedDate = moment(select);
    } else if (select.isBefore(deliveryDate, 'day') || select.isAfter(deliveryDate, 'day')) {
      tempSelectedDate = moment(select);
    } else if (deliveryDate.isSame(deliveryDate, 'day')) {
      tempSelectedDate = null;
    }

    dispatch(userActions.changeOrderDate(tempSelectedDate));
  };

  const nextPage = () => {
    if (deliveryDate) {
      LocalStorage.setDeliveryDate(deliveryDate);

      window.dataLayer.push({
        event: 'agoraBuyerDeliveryDate',
        formName: 'Agora Buyer Delivery Date',
      });

      history.push(`/${catalogId}/signup?order`);
    } else {
      setIsPopUp(true);
    }
  };

  const showSelectDate = () => {
    if (deliveryDate !== null) {
      if (common.lan === 'ZH-CN') {
        return `${moment(deliveryDate).locale(common.lan.toLowerCase()).format('M月D日')}`;
      }
      return moment(deliveryDate).locale(common.lan.toLowerCase()).format('MMMM D');
    }
    return '';
  };

  const showSelectedDate = () => {
    if (deliveryDate !== null) {
      if (common.lan === 'ZH-CN') {
        return moment(deliveryDate).locale(common.lan.toLowerCase()).format('M月DD日 dddd');
      }

      return moment(deliveryDate).locale(common.lan.toLowerCase()).format('dddd, DD MMM');
    }
    return '';
  };

  if (!isDeliveryDateChoosable) {
    return <Redirect to={`/${catalogId}/signup?order`} />;
  }

  return (
    <>
      <Header>
        <IconWrap onClick={history.goBack}>
          <BackIcon />
        </IconWrap>
        <Title>{order.select_delivery_date}</Title>
      </Header>
      <Empty />
      <ScrollView>
        <DisplayDateWrap>
          <DisplayDate>{showSelectedDate()}</DisplayDate>
        </DisplayDateWrap>
        <CalendarWrap>
          <Calendar />
        </CalendarWrap>
        <BtnWrap>
          <Button
            classTracking="buyer order cta-select-delivery-date"
            onClick={nextPage}
            shadow
          >
            {`${order.select} ${showSelectDate()}`}
          </Button>
        </BtnWrap>
        {isPopUp && (
          <PopUp
            widthPopUp
            text={order.select_delivery_date}
            setIsPopUp={setIsPopUp}
          />
        )}
      </ScrollView>
    </>
  );
};

const Header = styled.div`
  max-width: 552px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

const Empty = styled.div`
  height: 72px;
`;

const IconWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
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

const CalendarWrap = styled.div`
  margin-top: 27px;
`;

const ScrollView = styled.div`
  padding: 0 24px;
  overflow-y: auto;
  background: #fff;
  height: calc(100% - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnWrap = styled.div`
  margin-top: auto;
  margin-bottom: 16px;
  width: 100%;
`;

const DisplayDateWrap = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const DisplayDate = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #21272e;
`;

export default DeliveryDate;
