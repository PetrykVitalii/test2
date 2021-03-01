import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { loading } from '@/store/selectors/items';
import { selectItems } from '@/store/selectors/emptyItems';
import { emptyItemsActions, sendItems } from '@/store/actions/emptyItems';
import { selectLoading, selectUnits } from '@/store/selectors/units';
import { getUnits } from '@/store/actions/units';

import useKeyPress from '@/components/common/hooks/useKeyPress';
import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import WhatsappSupport from '@/components/common/WhatsappSupport';
import ButtonWrap from '@/components/common//ButtonWrap';
import AddItem from '@/components/items/AddItem';
import FixedHeader from '@/components/FixedHeader';
import Button from '@/components/Button';

interface Props {}

const AddItemsPage: React.FC<Props> = () => {
  const [{ items: itemsLan }] = useLanguage();

  const items = useSelector(selectItems);
  const isLoading = useSelector(loading);
  const isLoadingUnits = useSelector(selectLoading);
  const units = useSelector(selectUnits);

  const [isValidating, setIsValidating] = useToggle();
  const [isInputFocus, setIsInputFocus] = useToggle();
  const [isSelect, setIsSelect] = useToggle();

  const wrapper = useRef<any>();

  const dispatch = useDispatch();
  const history = useHistory();
  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    if (enterPress) {
      saveItems();
    }
  }, [enterPress]);

  useEffect(() => {
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    if (!items.length) {
      dispatch(emptyItemsActions.addEmptyItem());
      
    }
  }, [items]);

  useEffect(() => {
    if (items.length > 1) {
      window.scrollTo({ top: wrapper.current.offsetHeight - 400, behavior: 'smooth' });
    }
  }, [items.length]);

  useEffect(() => {
    setIsValidating(false);
  }, [items.length]);

  const refs = items.reduce((acc: any, value: any) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const goToErrorItem = (id: string) => {
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const saveItems = () => {
    setIsValidating(true);
    if (items.filter((item) => item.name).length !== items.length) {
      const findItem = items.find((item) => !item.name);
      if (findItem) {
        goToErrorItem(findItem.id);
      }
      return;
    }
    if (items.filter((item) => item.unit.name).length !== items.length) {
      const findItem = items.find((item) => !item.unit.name);
      if (findItem) {
        goToErrorItem(findItem.id);
      }
      return;
    }
    if (
      items.filter((item) => item.unit.name === 'Custom' && item.customUnit)
        .length !== items.filter((item) => item.unit.name === 'Custom').length
    ) {
      const findItem = items.find((item) => item.unit.name === 'Custom' && !item.customUnit);
      if (findItem) {
        goToErrorItem(findItem.id);
      }
      return;
    }
    dispatch(sendItems('/items/catalogs'));
  };

  const addItemHandler = () => {
    dispatch(emptyItemsActions.addEmptyItem());
  };

  const deleteAllItems = () => {
    dispatch(emptyItemsActions.clearItems());
    history.push('/items');
  };

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <HeaderSmallWrap>
            <TopButton onClick={deleteAllItems}>
              <PlusIcon width="26px" height="26px" />
            </TopButton>
            <AddItemsTitle>{itemsLan.add_new_items}</AddItemsTitle>
          </HeaderSmallWrap>
        </HeaderWrap>
      </FixedHeader>
      <View>
        <WhatsappSupport
          supportTitle={itemsLan.whatsapp_help_title}
          supportSubText={itemsLan.whatsapp_help_sub_title}
          whatsappNumber="+16502403661"
          whatsappMessage={itemsLan.whatsapp_help_message}
        />
        <MainWrap
          ref={wrapper}
          isInputFocus={isInputFocus}
          isSelect={isSelect}
        >
          {items.map((item, index) => (
            <AddItem
              isLoadingUnits={isLoadingUnits}
              units={units}
              disabled={items.length === 1}
              key={item.id}
              index={index}
              {...item}
              isValidating={isValidating}
              setIsInputFocus={setIsInputFocus}
              setIsSelect={setIsSelect}
              itemRef={refs}
            />
          ))}
          <ButtonWrap
            isFixed={!isInputFocus}
            paddingWidth={48}
            maxWidth={504}
            height={76}
          >
            <Button classTracking="item add-btn" isLoading={isLoading} shadow onClick={saveItems}>
              {`${items.length !== 1 ? `${itemsLan.add} ${items.length} ${itemsLan.items}` : itemsLan.add_item}`}
            </Button>
            <ButtonAdd className="onboarding add-items add-btn" onClick={addItemHandler}>
              <PlusIcon height="26" width="26" stroke="#3897FF" />
            </ButtonAdd>
          </ButtonWrap>
        </MainWrap>
      </View>
    </>
  );
};

const View = styled.div`
  min-height: 100%;
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

const MainWrap = styled.div<{ isInputFocus: boolean; isSelect: boolean }>`
  padding: ${({ isSelect }) => isSelect ? '12px 24px 240px' : '12px 24px 80px'};
  padding-bottom: ${({ isInputFocus }) => isInputFocus && '0'};
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 552px) {
    padding: ${({ isSelect }) => isSelect ? '12px 24px 280px' : '12px 24px 120px'};
    padding-bottom: ${({ isInputFocus }) => isInputFocus && '0'};
  }
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AddItemsTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #21272e;
  margin-left: 27px;
`;

const TopButton = styled.div`
  width: 26px;
  height: 26px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #21272e;
  cursor: pointer;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
`;

export default AddItemsPage;
