import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  dashboardActions,
  getSellerStats,
} from '@/store/actions/dashboard';

import { PERIODS } from '@/store/reducers/dashboard';

import {
  selectCurrentStatsPeriod,
  selectIsLoadingStats,
  selectSellerStats,
} from '@/store/selectors/dashboard';
import { selectIsInstallPwaVisible, selectIsPWA } from '@/store/selectors/pwa';
import { selectUserItems } from '@/store/selectors/items';
import {
  selectUser,
  selectPendingOrders,
  selectConfirmedOrders,
  selectPendingQuotes,
} from '@/store/selectors/user';

import useLanguage from '@/components/common/hooks/useLanguage';

import BoxIcon from '@/components/common/icons/BoxIcon';
import BoltIcon from '@/components/common/icons/BoltIcon';
import ShareIcon from '@/components/common/icons/ShareIcon';
import ItemsIcon from '@/components/common/icons/ItemsIcon';
import TimedBoxIcon from '@/components/common/icons/TimedBoxIcon';

import DownloadIcon from '@/components/common/icons/DownloadIcon';
import Calc from '@/components/common/icons/dashboard/Calc';
import Support from '@/components/common/icons/dashboard/Support';
import LinkIcon from '@/components/common/icons/dashboard/LinkIcon';

import InstallPwaIos from '@/components/InstallPwaIos';

import Navigation from '@/components/Navigation';
import Rectangle from '@/components/dashboard/Rectangle';
import StatisticRectangle from '@/components/dashboard/StatisticRectangle';
import StepPrompt from '@/components/dashboard/StepPrompt';
import List from '@/components/dashboard/List';

import { refreshUser } from '@/store/actions/auth';
import { getUserItems } from '@/store/actions/items';

import { STATUS_PENDING_KEY, STATUS_CONFIRMED_KEY, STATUS } from '@/utils/selectOrderStatus';
import { installPwa } from '@/utils/install-pwa';

const Dashboard: React.FC = () => {
  const [{ dashboard, common }] = useLanguage();

  const user = useSelector(selectUser);
  const confirmedOrders = useSelector(selectConfirmedOrders);
  const pendingOrders = useSelector(selectPendingOrders);
  const sellerStats = useSelector(selectSellerStats);
  const isLoadingStats = useSelector(selectIsLoadingStats);
  const pendingQuotes = useSelector(selectPendingQuotes);
  const userItems = useSelector(selectUserItems);
  const currentStatsPeriod = useSelector(selectCurrentStatsPeriod);
  const isInstallPwaVisible = useSelector(selectIsInstallPwaVisible);
  const isPWA = useSelector(selectIsPWA);

  const history = useHistory();
  const dispatch = useDispatch();

  const redirectToQuoteRequest = () => history.push('/quote-requests');
  const redirectToCatalog = () => history.push('/catalogs');
  const redirectToAddItems = () => history.push('/add-items');

  const redirectToConfirmedOrders = () => {
    const confirmedStatus = STATUS.find((status) => status.key === STATUS_CONFIRMED_KEY);
    dispatch(dashboardActions.setUpcomingDeliveriesOnly(false));
    dispatch(dashboardActions.setStatusFilters([confirmedStatus!]));
    history.push('/orders');
  };
  const redirectToPendingOrders = () => {
    const pendingStatus = STATUS.find((status) => status.key === STATUS_PENDING_KEY);
    dispatch(dashboardActions.setUpcomingDeliveriesOnly(false));
    dispatch(dashboardActions.setStatusFilters([pendingStatus!]));
    history.push('/orders');
  };

  const handleClickPrevStats = () => {
    switch (currentStatsPeriod) {
      case PERIODS.today: {
        dispatch(getSellerStats(PERIODS.yesterday));
        break;
      }
      case PERIODS.yesterday: {
        dispatch(getSellerStats(PERIODS.this_month));
        break;
      }
      case PERIODS.this_month: {
        dispatch(getSellerStats(PERIODS.last_month));
        break;
      }
      case PERIODS.last_month: {
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleClickNextStats = () => {
    switch (currentStatsPeriod) {
      case PERIODS.today: {
        break;
      }
      case PERIODS.yesterday: {
        dispatch(getSellerStats(PERIODS.today));
        break;
      }
      case PERIODS.this_month: {
        dispatch(getSellerStats(PERIODS.yesterday));
        break;
      }
      case PERIODS.last_month: {
        dispatch(getSellerStats(PERIODS.this_month));
        break;
      }
      default: {
        break;
      }
    }
  };

  const isNextButtonDisable = currentStatsPeriod === PERIODS.today;
  const isPrevButtonDisable = currentStatsPeriod === PERIODS.last_month;

  const getDateString = () => {
    switch (currentStatsPeriod) {
      case PERIODS.today: {
        return dashboard.date_today;
      }
      case PERIODS.yesterday: {
        return dashboard.range_option_yesterday;
      }
      case PERIODS.this_month: {
        return dashboard.this_month;
      }
      case PERIODS.last_month: {
        return dashboard.last_month;
      }
      default: {
        return '';
      }
    }
  };

  const contactSupport = () => {
    const target = isPWA ? '_self' : '_blank';
    window.open(`https://wa.me/+16502403661?text=${dashboard.contact_support}`, target);
  };

  useEffect(() => {
    dispatch(getSellerStats(PERIODS.today));
    dispatch(refreshUser());
    dispatch(getUserItems());
    // 
    // return () => {
    //   dispatch(userActions.setIsComing(false));
    // };
  }, []);

  // if (!isComing) {
  //   return <Loader scale="0.5" />;
  // }

  const getNotificationRectangle = () => {
    if (pendingOrders === null || !userItems) {
      return (null);
    }

    if (pendingOrders > 0) {
      return (
        <RectWrap>
          <Rectangle
            classTracking="dashboard action-needed-panel"
            text={dashboard.action_needed}
            subText={`${pendingOrders} ${
              pendingOrders === 1
                ? dashboard.to_be_confirmed_orders
                  .toLowerCase()
                  .replace('orders', common.word_order)
                  .toLowerCase()
                : dashboard.to_be_confirmed_orders
                  .toLowerCase()
                  .replace('orders', common.word_orders)
                  .toLowerCase()
            }`}
            subColor={Rectangle.subColor.white}
            theme={Rectangle.theme.blue}
            color={Rectangle.color.white}
            leftIcon={<BoltIcon />}
            height="80px"
            iconHeight="32px"
            onClick={redirectToPendingOrders}
          />
        </RectWrap>
      );
    }

    if (pendingOrders === 0) {
      if (userItems.length === 0) {
        return (
          <RectWrap>
            <Rectangle
              classTracking="dashboard no-items add-items-panel"
              text={dashboard.no_items_yet}
              subText={dashboard.no_items_yet_subtext}
              subColor={Rectangle.subColor.grey}
              theme={Rectangle.theme.transparent}
              color={Rectangle.color.black}
              leftIcon={<ItemsIcon width="28" height="28" />}
              height="80px"
              iconHeight="auto"
              arrowColor={Rectangle.arrowColor.dark}
              onClick={redirectToAddItems}
            />
          </RectWrap>
        );
      } if (userItems.length > 3) {
        return (
          <RectWrap>
            <Rectangle
              classTracking="dashboard no-orders share-catalogs-panel"
              text={dashboard.no_new_orders}
              subText={dashboard.no_new_orders_subtext}
              subColor={Rectangle.subColor.grey}
              theme={Rectangle.theme.transparent}
              color={Rectangle.color.black}
              leftIcon={<ShareIcon width="30" height="30" />}
              height="80px"
              iconHeight="auto"
              arrowColor={Rectangle.arrowColor.dark}
              onClick={redirectToCatalog}
            />
          </RectWrap>
        );
      }
      return (
        <RectWrap>
          <Rectangle
            classTracking="dashboard no-orders add-items-panel"
            text={dashboard.no_new_orders}
            subText={dashboard.add_more_items_subtext}
            subColor={Rectangle.subColor.grey}
            theme={Rectangle.theme.transparent}
            color={Rectangle.color.black}
            leftIcon={<ItemsIcon width="28" height="28" />}
            height="80px"
            iconHeight="auto"
            arrowColor={Rectangle.arrowColor.dark}
            onClick={redirectToAddItems}
          />
        </RectWrap>
      );
    }

    return (null);
  };

  const getNextStepPrompt = () => {
    if (userItems?.length === 0) {
      return (
        <StepPrompt
          classTracking="dashboard no-items cta-add-items"
          image="/assets/items/eyes.png"
          title={dashboard.no_items_yet}
          subText={dashboard.no_items_yet_description}
          buttonText={dashboard.btn_add_items}
          onClick={redirectToAddItems}
        />
      );
    } if (userItems?.length <= 3) {
      return (
        <StepPrompt
          classTracking="dashboard one-item cta-add-items"
          image="/assets/items/biceps.png"
          title={dashboard.add_more_items}
          subText={dashboard.add_more_items_description}
          buttonText={dashboard.btn_add_items}
          onClick={redirectToAddItems}
        />
      );
    }

    return (null);
  };

  return (
    <>
      <ScrollView>
        <Header>
          <Title>
            {dashboard.welcome_header}
            <Br />
            {user?.full_name}
          </Title>
        </Header>
        <View>
          {getNotificationRectangle()}
          <StatisticRectangle
            catalogVisits={sellerStats?.total_catalog_visits}
            ordersReceived={sellerStats?.total_order_received}
            catalogText={dashboard.catalog_visit}
            ordersText={dashboard.orders_received}
            date={getDateString()}
            height="181px"
            onPlusClick={handleClickNextStats}
            onMinusClick={handleClickPrevStats}
            isPrevButtonDisable={isPrevButtonDisable}
            isNextButtonDisable={isNextButtonDisable}
            isLoading={isLoadingStats}
            showLoader={false}
          />
          {!pendingOrders && getNextStepPrompt()}

          <>
            <Text>{dashboard.quick_links_header}</Text>
            <Empty height="12px" />
            {confirmedOrders ? (
              <Rectangle
                classTracking="dashboard orders-to-be-shipped"
                text={dashboard.to_be_shipped_orders}
                leftIcon={<TimedBoxIcon />}
                onClick={redirectToConfirmedOrders}
                pending={confirmedOrders}
              />
            ) : (
              <Rectangle
                classTracking="dashboard no-orders-to-be-shipped"
                text={dashboard.no_to_be_shipped_orders}
                leftIcon={<BoxIcon color="#dae1e8" width="24" height="24" />}
                color={Rectangle.color.grey}
                theme={Rectangle.theme.white}
                arrowColor={Rectangle.arrowColor.none}
                textCapitalize={false}
                textWrap
              />
            )}

          </>

          <QuotesHider>
            <Rectangle
              classTracking="dashboard quote-requests"
              text={dashboard.quote_requests}
              leftIcon={<Calc />}
              onClick={redirectToQuoteRequest}
              pending={pendingQuotes}
            />
          </QuotesHider>
          <Text>{dashboard.other_header}</Text>
          <List
            classTracking="dashboard contact-support"
            leftIcon={<Support />}
            text={dashboard.other_support}
            variant={List.variant.yellow}
            onClick={contactSupport}
          />
          <HowItWorks to="/help">
            <List
              classTracking="dashboard how-it-works"
              leftIcon={<LinkIcon />}
              text={dashboard.how_it_works}
              variant={List.variant.green}
            />
          </HowItWorks>
          {isInstallPwaVisible && (
            <List
              classTracking="dashboard install-app"
              leftIcon={<DownloadIcon />}
              text={common.install_app}
              variant={List.variant.blue}
              onClick={installPwa}
            />
          )}
          {/* <Empty /> */}
        </View>
      </ScrollView>
      <Navigation path="dashboard" />
      <InstallPwaIos />
    </>
  );
};

const Empty = styled.div<{ height?: string }>`
  height: ${({ height }) => (height && height) || '50px'};
  background: #fff;
`;

const QuotesHider = styled.div`
  display: none;
`;

const ScrollView = styled.div`
  background: #fff;
  min-height: calc(100vh - 144px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 224px);
  }
`;

const Header = styled.div`
  min-height: 350px;
  padding: 32px 70px 59px 16px;
  background-color: #f4f5f9;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  text-transform: capitalize;
`;

const View = styled.div`
  position: relative;
  margin-top: -211px;
  padding: 0 16px 50px 16px;
`;

const RectWrap = styled.div`
  margin-bottom: 34px;
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
  margin-top: 41px;
  margin-bottom: 15px;
`;

const HowItWorks = styled(Link)`
  text-decoration: none;
`;

const Br = styled.br``;

export default Dashboard;
