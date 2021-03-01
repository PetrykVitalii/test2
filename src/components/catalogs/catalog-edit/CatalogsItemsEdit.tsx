import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  editCatalogDetailItems,
  getCatalog,
  getCatalogItems,
} from '@/store/actions/catalog';
import {
  selectCatalogItems,
  selectCatalog,
  selectIsLoading,
} from '@/store/selectors/catalog';
import { selectUserItems, loading } from '@/store/selectors/items';
import { Filters } from '@/store/reducers/items';
import { getUserItems } from '@/store/actions/items';

import useLanguage from '@/components/common/hooks/useLanguage';
import useKeyPress from '@/components/common/hooks/useKeyPress';
import useToggle from '@/components/common/hooks/useToggle';

import SearchIcon from '@/components/common/icons/SearchIcon';
import PencilIcon from '@/components/common/icons/PencilIcon';
import CloseIcon from '@/components/common/icons/CloseIcon';
import FilterIcon from '@/components/common/icons/items/FilterIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import LoaderDots from '@/components/common/LoaderDots';
import Loader from '@/components/common/Loader';
import ButtonWrap from '@/components/common//ButtonWrap';

import CatalogsEdit from '@/components/catalogs/catalog-edit/CatalogsEditPrice';
import Item from '@/components/catalogs/catalog-edit/ItemCheckbox';
import ModalFilter from '@/components/catalogs/catalog-edit/ModalFilter';

import Search from '@/components/catalogs/catalog-edit/SearchItemsEdit';

import Rectangle from '@/components/catalogs/Rectangle';
import FixedHeader from '@/components/FixedHeader';
import Button from '@/components/Button';

interface Props extends RouteComponentProps<{id: string}> {
}

const CatalogItemEdit: React.FC<Props> = ({ match }) => {
  const [{ catalogs, common, items: itemsLan }] = useLanguage();
  const [isEdit, setIsEdit] = useToggle();
  const [isModalFilter, setIsModalFilter] = useToggle();
  const [isModalSearch, setIsModalSearch] = useToggle();

  const [filter, setFilter] = useState(Filters.ALL);

  const userItems = useSelector(selectUserItems);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleBack = () => history.push(`/catalogs/${match.params.id}`);
  const handleToggleEdit = () => setIsEdit(!isEdit);

  const items = useSelector(selectCatalogItems);
  const catalog = useSelector(selectCatalog);
  const isLoading = useSelector(selectIsLoading);

  const isLoadingItems = useSelector(loading);

  const enterPress = useKeyPress('Enter');

  const mapped = userItems.map((item) => {
    const findItem = items.find((itm) => itm.id === item.id);
    if (findItem) {
      return { ...findItem };
    }
    return { ...item };
  });

  const filterItems = mapped.filter((item) => {
    if (filter === Filters.LISTED) return item.is_listed;
    if (filter === Filters.HIDDEN) return !item.is_listed;
    return true;
  });

  const filterName = () => {
    if (filter === Filters.LISTED) return itemsLan.filter_listed_items;
    if (filter === Filters.HIDDEN) return itemsLan.filter_hidden_items;
    return itemsLan.filter_all_items;
  };

  const goToAddItems = () => history.push('/catalogs/add-items');

  useEffect(() => {
    
    if (!catalog) {
      dispatch(getCatalogItems(+match.params.id));
      dispatch(getCatalog(+match.params.id));
    }
    dispatch(getUserItems());
  }, []);

  useEffect(() => {
    if (enterPress) {
      hanleSendInfo();
    }
  }, [enterPress]);

  // useEffect(() => {
  //   if (!isLoaded) {
  //     history.push(`/catalogs/${match.params.id}`);
  //   }

  //   return () => {
  //     dispatch(catalogsActions.setIsComming(false));
  //   };
  // }, []);

  if (catalog === null) {
    return (
      <>
        <FixedHeader>
          <HeaderContainer>
            <HeaderWrap>
              <IconWrap onClick={handleBack}>
                <CloseIcon />
              </IconWrap>
              <HeaderTextWrap>
                <Title>{' '}</Title>
                <HeaderText>{catalogs.manage_prices_header}</HeaderText>
              </HeaderTextWrap>
              <RightHeaderWrap className="catalog edit-item edit-btn" onClick={handleToggleEdit}>
                <PencilIcon />
              </RightHeaderWrap>
            </HeaderWrap>
          </HeaderContainer>
        </FixedHeader>
        <Loader scale="0.5" />
      </>
    );
  }

  const hanleSendInfo = () => dispatch(editCatalogDetailItems(catalog.id));

  if (isEdit) {
    return (
      <CatalogsEdit
        handleToggleEdit={handleToggleEdit}
      />
    );
  }

  if (isModalSearch) {
    return (
      <Search
        isCustomPrice={catalog.is_custom_pricing_enabled}
        filterItems={items}
        items={mapped}
        setIsModal={setIsModalSearch}
      />
    );
  }

  return (
    <>
      <FixedHeader>
        <HeaderContainer>
          <HeaderWrap>
            <IconWrap onClick={handleBack}>
              <CloseIcon />
            </IconWrap>
            <HeaderTextWrap>
              <Title>{catalogs.manage_items}</Title>
              <HeaderText>
                {catalog.is_default ? catalogs.all_items_header : catalog.name}
              </HeaderText>
            </HeaderTextWrap>
            {!catalog.is_default && (
              <SearchIconWrap className="catalog item-list search-btn" onClick={() => setIsModalSearch(true)}>
                <SearchIcon />
              </SearchIconWrap>
            )}
          </HeaderWrap>
        </HeaderContainer>
      </FixedHeader>
      {isLoadingItems || catalog === null || isLoading ? (
        <Loader scale="0.5" />
      ) : (
        <ScrollView>

          <Rectangle
            classTracking="catalog edit-business-details-btn"
            onClick={handleToggleEdit}
            text={catalogs.edit_details_prices}
            style={{ marginBottom: '40px' }}
          />

          <CustomPricingWrap>
            <CountItems>{`${filterName()} (${filterItems.length})`}</CountItems>
            <Filter className="item-list filter-btn" onClick={() => setIsModalFilter(true)}>
              {itemsLan.filter}
              <FilterImg>
                <FilterIcon />
              </FilterImg>
            </Filter>
          </CustomPricingWrap>
          <ItemsWrap>
            {filterItems
              .slice()
              .sort(
                (a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1,
              )
              .map((item) => (
                <Item
                  isCustomPrice={catalog.is_custom_pricing_enabled}
                  key={item.id}
                  item={item}
                  isExist={!!items.find((catalo) => catalo.id === item.id)}
                />
              ))}
          </ItemsWrap>
          {!catalog.is_default && (
            <ButtonWrap isFixed>
              <Button
                classTracking="catalog edit-item cta-save-changes"
                shadow
                onClick={hanleSendInfo}
                disabled={isLoading}
              >
                {isLoading ? <LoaderDots /> : common.btn_save_changes}
              </Button>
              <ButtonAdd className="onboarding add-items add-btn" onClick={goToAddItems}>
                <PlusIcon height="26" width="26" stroke="#3897FF" />
              </ButtonAdd>
            </ButtonWrap>
          )}

          {isModalFilter && (
            <ModalFilter
              filterItems={filter}
              setFilter={setFilter}
              hideModal={setIsModalFilter}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

const HeaderContainer = styled.div`
  padding: 0 24px;
  width: 100%;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  background: #fff;
  padding: 32px 16px 74px 16px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

const RightHeaderWrap = styled.div`
  margin-left: 20px;
  position: relative;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  display: flex;
  align-items: center;
  justify-content: center;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-transform: capitalize;
`;

const HeaderText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  text-transform: capitalize;
`;

const CountItems = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  color: #787c80;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ItemsWrap = styled.div`
  margin-bottom: 75px;
`;

const CustomPricingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SearchIconWrap = styled.div`
  max-width: 24px;
  max-height: 24px;
  margin-left: 24px;
  cursor: pointer;
`;

const Filter = styled.div`
  cursor: pointer;
  font-size: 12px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #3897ff;
  display: flex;
  align-items: center;
`;

const FilterImg = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 0 1px 4px;
`;

const ButtonAdd = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 5px 20px -7px rgba(0, 0, 0, 0.35);
  left: calc(100% - 58px);
  bottom: 128px;
  position: relative;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default CatalogItemEdit;
