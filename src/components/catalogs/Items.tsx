import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCatalogItems,
  selectCatalog,
  selectIsComming,
} from '@/store/selectors/catalog';

import { getCatalogItems } from '@/store/actions/catalog';
import { selectUserItems } from '@/store/selectors/items';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import CheckboxIcon from '@/components/common/icons/CheckboxIcon';
import ItemsIcon from '@/components/common/icons/ItemsIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import Loader from '@/components/common/Loader';

import Rectangle from '@/components/catalogs/Rectangle';
import Search from '@/components/catalogs/Search';
import Item from '@/components/catalogs/Item';
import Button from '@/components/Button';

interface Props {
  id: number;
}

const Items: React.FC<Props> = ({ id }) => {
  const history = useHistory();
  const [{ catalogs, authorization }] = useLanguage();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useToggle();

  const userItems = useSelector(selectUserItems);

  const catalog = useSelector(selectCatalog);
  const items = useSelector(selectCatalogItems);

  const isLoading = !useSelector(selectIsComming);

  if (catalog === null) {
    return null;
  }

  const handleGoToAddItems = () => {
    if (catalog.is_default) {
      history.push('/catalogs/add-items');
    } else {
      history.push(`/catalogs/add-items/${catalog.id}`);
    }
  };
  const handleGoToItems = () => history.push(`/catalogs/${catalog.id}/items`);

  useEffect(() => {
    dispatch(getCatalogItems(id));
  }, []);

  const getEmptyView = () => {
    if (!userItems.length) {
      return (
        <WrapperEmpty>
          <IconWrap>
            <ItemsIcon />
          </IconWrap>
          <EmptyTitle>{catalogs.no_items_header}</EmptyTitle>
          <Desc>{catalogs.add_items_label}</Desc>
          <ButtonWrap onClick={handleGoToAddItems}>
            <Button icon bold classTracking="catalog add-items">{catalogs.btn_empty_add_items}</Button>
          </ButtonWrap>
        </WrapperEmpty>
      );
    }

    return (
      <WrapperEmpty>
        <IconWrap>
          <CheckboxIcon style={{ width: '32px', height: '32px' }} />
        </IconWrap>
        <EmptyTitle>{catalogs.no_catalog_items_header}</EmptyTitle>
        <Desc>{catalogs.add_items_label}</Desc>
        <ButtonWrap onClick={handleGoToItems}>
          <Button icon bold classTracking="catalog select-items">{catalogs.btn_empty_add_items}</Button>
        </ButtonWrap>
      </WrapperEmpty>
    );
  };

  if (isModal) {
    return (
      <Search
        items={items}
        setIsModal={setIsModal}
      />
    );
  }

  const getCatalogHeader = (count: number) => {
    let itemsStr: string = `${catalogs.catalog_all_items.replace('{{count}}', `${count}`)}`;
    let itemStr: string = `${catalogs.catalog_all_item.replace('{{count}}', `${count}`)}`;

    if (!catalog.is_default) {
      itemsStr = `${catalogs.catalog_x_items_selected.replace('{{count}}', `${count}`)}`;
      itemStr = `${catalogs.catalog_x_item_selected.replace('{{count}}', `${count}`)}`;
    }
    return `${count > 1 ? itemsStr : itemStr}`;
  };

  return (
    <>
      {catalog.is_default ? (
        <>
          {items.length !== 0 && (
            <Rectangle
              text={authorization.step_add_items}
              style={{ marginTop: '24px', marginBottom: '32px' }}
              icon={<CheckboxIcon style={{ width: '24px', height: '24px' }} />}
              onClick={handleGoToAddItems}
              classTracking="catalog all-items-add-items"
            />
          )}
        </>
      ) : (
        <>
          {items.length !== 0 && (
            <Rectangle
              text={catalogs.manage_items}
              style={{ marginTop: '24px', marginBottom: '32px' }}
              icon={<CheckboxIcon style={{ width: '24px', height: '24px' }} />}
              onClick={handleGoToItems}
              classTracking="catalog manage-items-btn"
            />
          )}
        </>
      )}

      <Wrapper className="catalog items-panel">
        {isLoading ? (
          <Loader scale="0.5" />
        ) : (
          <>
            { items.length === 0
              ? getEmptyView()
              : (
                <>
                  <TitleWrapper>
                    <Title>
                      {getCatalogHeader(items.length)}
                    </Title>
                    <IconSearchWrap onClick={() => setIsModal(true)}>
                      <SearchIcon />
                    </IconSearchWrap>
                  </TitleWrapper>
                  <ItemList>
                    {items
                      .slice()
                      .sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
                        ? 1 : -1)
                      .map((item) => (
                        <Item
                          key={item.id}
                          isCustomPrice={catalog.is_custom_pricing_enabled}
                          item={item}
                          catalogId={catalog.id}
                        />
                      ))}
                  </ItemList>
                </>
              )}
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Title = styled.span`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
`;

const ItemList = styled.div`
  margin-top: 20px;
`;

const WrapperEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 24px 18px 24px;
  border-radius: 6px;
  background-color: #ffffff;
`;

const EmptyTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const IconWrap = styled.div`
  margin-bottom: 10px;
`;

const IconSearchWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`;

const Desc = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin: 8px 0 24px;
  color: #909599;
`;

const ButtonWrap = styled.div`
  width: 153px;
`;

export default Items;
