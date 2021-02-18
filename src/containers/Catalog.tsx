/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SellSmarterIcon from '@/components/common/icons/SaleSmarter';
import ModalAbout from '@/components/catalog/ModalAbout';
import useToggle from '@/components/common/hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCatalog,
  selectIsError,
  selectLoading,
  selectScrollY,
} from '@/store/selectors/catalog';
import { catalogActions, getCatalog } from '@/store/actions/catalog';
import { RouteComponentProps } from 'react-router';
import Loader from '@/components/Loader';
import LnSwitcher from '@/components/common/LnSwitcher';
import useLanguage from '@/components/common/hooks/useLanguage';
import NoValidLink from '@/components/NoValidLink';
import PopUp from '@/components/PopUp';
import { TabPane, TabsLayout } from '@/components/common/Tabs';
import ItemsPanel from '@/components/catalog/ItemsPanel';
import ProfilePanel from '@/components/catalog/ProfilePanel';
import { selectCatalogItems } from '@/store/selectors/items';
import { userActions } from '@/store/actions/user';
import LocalStorage from '@/utils/local-storage';
import { FullItem } from '@/store/reducers/items';
import { itemsActions } from '@/store/actions/items';

interface Props extends RouteComponentProps<{ catalogId: string }> {}

const Catalog: React.FC<Props> = ({ match, history }) => {
  const id = match.params.catalogId;
  const [isPopUp, setIsPopUp] = useToggle(false);
  const [isActiveModal, setIsActiveModal] = useToggle();
  const catalog = useSelector(selectCatalog);
  const isLoading = useSelector(selectLoading);
  const scroll = useSelector(selectScrollY);
  const isError = useSelector(selectIsError);
  const items = useSelector(selectCatalogItems);
  const [{ common, catalog: catalogLan }] = useLanguage();
  const [initialTab, setInitialTab] = useState('items');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!catalog.phone) {
      dispatch(getCatalog(id));
    }

    if (scroll) {
      window.scrollTo({
        top: scroll,
        behavior: 'auto',
      });
    }
    return () => {
      dispatch(catalogActions.setScrollY(window.scrollY));
    };
  }, []);

  useEffect(() => {
    setInitialTab(items.length ? 'items' : 'profile');

    if (LocalStorage.getUserInfo() && LocalStorage.getUserItems()) {
      const itemsLocal = LocalStorage.getUserItems();
      const newItems = items.map((item: FullItem) => {
        const newItem = itemsLocal.filter((localItem: FullItem) => {
          const changeItem = { ...item };
          if (changeItem.id === localItem.id) {
            changeItem.count = localItem.count;
            changeItem.is_status = true;
            return changeItem;
          }
          return null;
        });
        return newItem.length ? newItem[0] : item;
      });
      dispatch(itemsActions.setCatalogItems(newItems));
    }
  }, [items.length]);

  const openFork = (isPath: boolean) => () => {
    if (items.filter((item) => item.is_status).length !== 0) {
      const filterItems = items.filter((item) => item.is_status);

      dispatch(userActions.setUserItems(filterItems));

      if (!LocalStorage.getUserInfo()) {
        LocalStorage.clearAllOrderInfo();
      }

      LocalStorage.setCatalogCode(id);
      LocalStorage.setUserItems(filterItems);

      if (isPath) {
        history.push(`/${id}/item-list`);
      } else {
        history.push(`/${id}/quote-details`);
      }
    } else {
      setIsPopUp(true);
    }
  };

  const truncateTitle = () => {
    const regExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g;
    const str = catalog.seller_catalog.is_default
      ? catalog.business_name
      : catalog.seller_catalog.name;

    const truncateStr = str
      .replace(regExp, '')
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .slice(0, 2);

    return truncateStr;
  };

  if (isLoading) {
    return <Loader scale="0.5" />;
  }

  if (isError || !catalog.seller_catalog.is_public) {
    return (
      <NoValidLink
        text={isError ? common.link : common.lock}
        src={isError ? '/assets/smile.png' : '/assets/lock.png'}
      />
    );
  }

  return (
    <Container>
      {isActiveModal && (
        <ModalAbout description={catalog.seller_catalog.description} hideModal={setIsActiveModal} />
      )}
      {isPopUp && <PopUp setIsPopUp={setIsPopUp} text={catalogLan.please_select} />}
      <Header>
        <WrapLogo>
          <SellSmarterIcon />
        </WrapLogo>
        <LnSwitcher />
      </Header>
      <Empty />
      <WrapImage src={catalog.seller_catalog.category.image_url} alt="Catalog" />
      <Main>
        <CircleTitle>
          {truncateTitle()}
        </CircleTitle>
        <CatalogTitle>
          {catalog.seller_catalog.is_default
            ? catalog.business_name
            : catalog.seller_catalog.name}
        </CatalogTitle>

        <TabsLayout initialTab={initialTab}>
          <TabPane
            tabId="items"
            tabName={catalogLan.tab_items_header}
            classTracking="buyer-catalog items-tab info"
          >
            <ItemsPanel catalogId={id} catalog={catalog} openFork={openFork} />
          </TabPane>
          <TabPane
            tabId="profile"
            tabName={catalogLan.tab_profile_header}
            classTracking="buyer-catalog profile-tab info"
          >
            <ProfilePanel catalog={catalog} setIsActiveModal={setIsActiveModal} />
          </TabPane>
        </TabsLayout>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  padding-bottom: 16px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div<{ height?: string }>`
  height: ${({ height }) => height || '72px'};
  width: 100%;
`;

const CatalogTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  color: #21272e;
  margin-top: 5px;
  word-break: break-word;
`;

const CircleTitle = styled.div`
  width: 98px;
  height: 98px;
  background-color: #e5f4f5;
  border-radius: 50%;
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
  border: 8px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: -55px auto 0;
  z-index: 100;
  position: relative;
  text-transform: uppercase;
`;

const WrapImage = styled.img`
  width: 100%;
  height: 147px;
  object-fit: cover;
`;

const Main = styled.div`
  width: 100%;
  padding: 0 16px 0;
  background-color: white;
`;

const WrapLogo = styled.div`
  width: 120px;
  height: 48px;
`;

const Header = styled.div`
  padding: 0 20px 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  max-width: 552px;
  z-index: 110;
`;

export default Catalog;
