import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserItems, selectIsComming } from '@/store/selectors/items';
import { selectCatalog, selectItems } from '@/store/selectors/createCatalog';
import { getUserItems, itemsActions } from '@/store/actions/items';

import useLanguage from '@/components/common/hooks/useLanguage';
import useKeyPress from '@/components/common/hooks/useKeyPress';
import useToggle from '@/components/common/hooks/useToggle';

import SearchIcon from '@/components/common/icons/SearchIcon';
import CloseIcon from '@/components/common/icons/CloseIcon';
import ItemsIcon from '@/components/common/icons/navigation/itemsIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';

import Item from '@/components/catalogs/create-steps/Item';
import Modal from '@/components/catalogs/create-steps/Modal';
import Search from '@/components/catalogs/create-steps/SearchStep3';
import InfoContainer from '@/components/auth/InfoContainer';
import CatalogCreateStep from '@/components/CatalogCreateStep';
import ButtonWrap from '@/components/common/ButtonWrap';
import FixedHeader from '@/components/FixedHeader';
import Loader from '@/components/common/Loader';
import Button from '@/components/Button';
import MyToast from '@/components/Toast';

interface Props {
  handleCloseCreateCategory: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  openModal: boolean;
}

const Step3: React.FC<Props> = ({
  handleCloseCreateCategory,
  handleOpenModal,
  handleCloseModal,
  openModal,
}) => {
  const [{ catalogs, items }] = useLanguage();
  const history = useHistory();

  const userItems = useSelector(selectUserItems);
  const isComming = useSelector(selectIsComming);
  const createCategoryItems = useSelector(selectItems);
  const [isModal, setIsModal] = useToggle(false);
  const [isToast, setIsToast] = useToggle(false);
  const catalog = useSelector(selectCatalog);

  const dispatch = useDispatch();

  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (enterPress) {
      handleNextStep();
    }
  }, [enterPress]);

  useEffect(() => {
    if (!catalog.name) history.push('/catalogs/new/step1');

    dispatch(getUserItems());

    return () => {
      dispatch(itemsActions.setIsComming(false));
    };
  }, []);

  useEffect(() => {
    let timer: number;

    if (isToast) {
      timer = setTimeout(() => {
        setIsToast(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isToast]);

  const [btnLeftName, btnRightName] = catalogs.btn_add_items.split(' ');

  const handleNextStep = () => {
    if (createCategoryItems.length > 0) {
      history.push('/catalogs/new/step4');
    } else {
      setIsToast(true);
    }
  };

  const checkName = () => {
    if (createCategoryItems.length === 1) {
      return `${items.select} ${createCategoryItems.length} ${items.unit_item}`;
    }
    if (createCategoryItems.length > 1) {
      return `${btnLeftName} ${createCategoryItems.length} ${btnRightName}`;
    }
    return `${items.select_item}`;
  };

  const addItem = () => history.push('/catalogs/new/step3/add-items');

  if (isModal) {
    return (
      <Search createCategoryItems={createCategoryItems} items={userItems} setIsModal={setIsModal} />
    );
  }

  return (
    <>
      <FixedHeader>
        <HeaderWrap>
          <IconWrap onClick={handleOpenModal}>
            <CloseIcon />
          </IconWrap>
          <Title>{catalogs.header_catalog}</Title>
          <SearchIconWrap className="catalog item-list search-btn" onClick={setIsModal}>
            <SearchIcon />
          </SearchIconWrap>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView>
        {!isComming ? (
          <Loader scale="0.5" />
        ) : (
          <>
            <CatalogCreateStep active={[1, 1, 0]} done={[1, 0, 0]} />
            {userItems.length > 0 ? (
              <Container>
                <Wrap>
                  <InfoContainer
                    classTracking="create-catalog info-panel"
                    text={catalogs.select_existing}
                    image={<ItemsIcon />}
                  />
                </Wrap>
                {userItems
                  .slice()
                  .sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
                    ? 1 : -1)
                  .map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                      isExist={
                        !!createCategoryItems.find((catalogItem) => catalogItem.id === item.id)
                      }
                    />
                  ))}
                <ButtonWrap
                  isFixed
                >
                  <Button shadow onClick={handleNextStep}>
                    {checkName()}
                  </Button>
                  <ButtonAdd className="catalog add-items-btn" onClick={addItem}>
                    <PlusIcon height="26" width="26" stroke="#3897FF" />
                  </ButtonAdd>
                </ButtonWrap>
              </Container>
            ) : (
              <NoItemWrap>
                <EyesWrap>
                  <Eyes src="/assets/items/eyes.png" alt="eyes" />
                </EyesWrap>
                <AddItem>{catalogs.no_items}</AddItem>
                <NoItem>{catalogs.tap_plus_button}</NoItem>
                <ButtonAddPlus className="catalog add-items-btn" onClick={addItem}>
                  <PlusIcon height="26" width="26" stroke="#3897FF" />
                </ButtonAddPlus>
              </NoItemWrap>
            )}
            <MyToast
              isActive={isToast}
              text={catalogs.please_select_item}
              style={{
                maxWidth: '520px',
                width: 'calc(100% - 32px)',
                bottom: 88,
                position: 'fixed',
              }}
              autoClose={2000}
            />
            {openModal && (
              <Modal closeModal={handleCloseModal} cleanCatalog={handleCloseCreateCategory} />
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

const Container = styled.div`
  background: #fff;
  padding: 16px;
  padding-bottom: 140px;

  @media screen and (min-width: 552px) {
    padding-bottom: 180px;
  }
`;

const AddItem = styled.div`
  font-size: 16px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
  margin-bottom: 8px;
`;

const NoItem = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #787c80;
`;

const EyesWrap = styled.div`
  width: 40px;
  padding-top: 76px;
  margin: 0 auto;
`;

const Eyes = styled.img`
  width: 40px;
  height: 53px;
  object-fit: contain;
  font-family: AppleColorEmoji;
  font-size: 64px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const NoItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 91px);
  padding: 0 16px 24px;
`;

const ButtonAddPlus = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 5px 20px -7px rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-left: auto;
  cursor: pointer;
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

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const ScrollView = styled.div`
  background: #fff;
  position: relative;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Wrap = styled.div`
  margin-bottom: 32px;
`;

const IconWrap = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 24px;
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
`;

const SearchIconWrap = styled.div`
  max-width: 24px;
  max-height: 24px;
  margin-left: 24px;
  margin-left: auto;
  cursor: pointer;
`;

export default Step3;
