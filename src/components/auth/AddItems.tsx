import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getUnits } from '@/store/actions/units';
import { selectUnits } from '@/store/selectors/units';
import { emptyItemsActions } from '@/store/actions/emptyItems';
import { sendItems } from '@/store/actions/auth';
import { selectItems } from '@/store/selectors/emptyItems';
import { selectIsLoading } from '@/store/selectors/auth';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';
import useKeyPress from '@/components/common/hooks/useKeyPress';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import ItemsIcon from '@/components/common/icons/navigation/itemsIcon';
import InfoContainer from '@/components/auth/InfoContainer';
import CreateCatalogsStep from '@/components/auth/CreateCatalogStep';
import Item from '@/components/auth/Item';
import ButtonWrap from '@/components/common/ButtonWrap';
import Button from '@/components/Button';

interface Props {}

const AddItems: React.FC<Props> = () => {
  const [{ items: itemsLan, authorization }] = useLanguage();

  const items = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const units = useSelector(selectUnits);

  const [isInputFocus, setIsInputFocus] = useToggle();
  const [isHidePlus, setIsHidePlus] = useToggle(true);
  const [isValidating, setIsValidating] = useToggle();
  const [isSelect, setIsSelect] = useToggle();

  const containerRef = useRef<any>();
  const dispatch = useDispatch();
  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    if (enterPress) {
      nextStepHandler();
    }
  }, [enterPress]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    setIsValidating(false);
  }, [items]);

  useEffect(() => {
    if (items.length > 1) {
      window.scrollTo({ top: containerRef.current.offsetHeight - 400, behavior: 'smooth' });
    }
  }, [items.length]);

  useEffect(() => {
    if (!items.length) {
      dispatch(emptyItemsActions.addEmptyItem());
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      const item = items[0];
      if (item.name && item.unit.name) {
        if (item.unit.name !== 'Custom' || (item.unit.name === 'Custom' && item.customUnit)) {
          setIsHidePlus(false);
        } else {
          setIsHidePlus(true);
        }
      } else {
        setIsHidePlus(true);
      }
    }
  }, [items]);

  const addItemHandler = () => {
    dispatch(emptyItemsActions.addEmptyItem());
  };

  const deleteItemHandler = (id: string) => () => dispatch(emptyItemsActions.deleteItem(id));

  const refs = items.reduce((acc: any, value: any) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const goToErrorItem = (id: string) => {
    refs[id].current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const nextStepHandler = () => {
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
      items.filter((item) => item.unit.name === 'Custom' && item.customUnit).length
      !== items.filter((item) => item.unit.name === 'Custom').length
    ) {
      const findItem = items.find((item) => item.unit.name === 'Custom' && !item.customUnit);
      if (findItem) {
        goToErrorItem(findItem.id);
      }
      return;
    }

    dispatch(sendItems());
  };

  return (
    <Main>
      <CreateCatalogsStep active={[1, 1, 0]} done={[1, 0, 0]} />
      <Container
        ref={containerRef}
        isInputFocus={isInputFocus}
        isSelect={isSelect}
      >
        <InfoContainer classTracking="onboarding info-panel" isSkip image={<ItemsIcon />} text={authorization.items_and_details} />
        <ItemsWrapper>
          {items.map((item, index) => (
            <Item
              {...item}
              key={item.id}
              id={item.id}
              index={index}
              isValidating={isValidating}
              onDelete={deleteItemHandler(item.id)}
              length={items.length}
              units={units}
              setIsInputFocus={setIsInputFocus}
              setIsSelect={setIsSelect}
              itemRef={refs}
            />
          ))}
        </ItemsWrapper>
        <ButtonWrap
          isFixed={!isInputFocus}
          maxWidth={504}
          paddingWidth={48}
        >
          <Button
            classTracking="onboarding add-items cta-next"
            isLoading={isLoading}
            shadow
            onClick={nextStepHandler}
          >
            {`${
              items.length !== 1
                ? `${itemsLan.add} ${items.length} ${itemsLan.items}`
                : itemsLan.add_item
            }`}
          </Button>
          {!isHidePlus && (
            <ButtonAdd className="onboarding add-items add-btn" onClick={addItemHandler}>
              <PlusIcon height="26" width="26" stroke="#3897FF" />
            </ButtonAdd>
          )}
        </ButtonWrap>
      </Container>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div<{ isInputFocus: boolean; isSelect: boolean }>`
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

const ItemsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

export default AddItems;
