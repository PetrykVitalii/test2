import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { loading, selectUserItems } from '@/store/selectors/items';
import { getUserItems } from '@/store/actions/items';
import { Filters } from '@/store/reducers/items';
import { getUnits } from '@/store/actions/units';

import useToggle from '@/components/common/hooks/useToggle';
import Catalog from '@/components/items/Catalog';
import EmptyCatalog from '@/components/items/EmptyCatalog';
import ItemHeader from '@/components/items/ItemHeader';
import ModalFilter from '@/components/items/ModalFilter';

import Search from '@/components/items/Search';
import Loader from '@/components/common/Loader';
import Navigation from '@/components/Navigation';

const Items: React.FC = () => {
  const [isActiveFilter, setActiveFilter] = useToggle();
  const [isActiveSearch, setActiveSearch] = useToggle();
  const [filter, setFilter] = useState(Filters.ALL);
  const [isCameItems, setIsCameItems] = useToggle(true);

  const dispatch = useDispatch();
  const userItems = useSelector(selectUserItems);
  const isLoading = useSelector(loading);

  const filterItems = userItems.filter((item) => {
    if (filter === Filters.LISTED) return item.is_listed;
    if (filter === Filters.HIDDEN) return !item.is_listed;
    return true;
  });

  useEffect(() => {
    
    dispatch(getUserItems());
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    setIsCameItems(false);
  }, [userItems]);

  if (isActiveSearch) {
    return <Search userItems={userItems} hideSearch={setActiveSearch} />;
  }

  return (
    <>
      <ItemHeader openSearch={setActiveSearch} />
      <ItemsContainer>
        {isLoading || isCameItems
          ? <Loader scale="0.5" />
          : (
            <>
              {userItems.length > 0 ? (
                <Catalog
                    filter={filter}
                    userItems={filterItems}
                    openModal={setActiveFilter}
                />
              ) : !isCameItems && (
              <EmptyCatalog />
              )}
            </>
          )}
      </ItemsContainer>
      {!isActiveSearch && (
      <Navigation path="items" />
      )}
      {isActiveFilter && (
        <ModalFilter
          filterItems={filter}
          setFilter={setFilter}
          hideModal={setActiveFilter}
        />
      )}
    </>
  );
};

const ItemsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
  padding-bottom: 20px;
  min-height: calc(100vh - 144px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 224px);
  }
`;

export default Items;
