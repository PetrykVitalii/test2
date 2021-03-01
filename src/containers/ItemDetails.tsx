import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {
  loading, selectUserItem, selectUrl, smallLoading, saveLoading, selectUserItems,
} from '@/store/selectors/items';
import {
  getUserItem, editItem, deleteUserItem, getUrl, itemsActions,
} from '@/store/actions/items';
import { selectPlaceholder } from '@/store/selectors/user';
import { getUnits } from '@/store/actions/units';
import { selectUnits } from '@/store/selectors/units';
import scrollTo from '@/utils/scrollTo';

import useInput from '@/components/common/hooks/useInput';
import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import DeleteIcon from '@/components/common/icons/items/DeleteIcon';
import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';

import LoaderDots from '@/components/common/LoaderDots';
import Loader from '@/components/common/Loader';

import ButtonWrap from '@/components/common/ButtonWrap';
import AddImage from '@/components/items/AddImage';
import ModalInfo from '@/components/items/ModalInfo';
import InputFile from '@/components/InputFile';
import DropDownSelect from '@/components/DropDownSelect';
import InputBorder from '@/components/InputBorder';
import TextArea from '@/components/TextArea';
import Switch from '@/components/Switch';
import InputCurrency from '@/components/InputCurrency';
import Button from '@/components/Button';
import InputCode from '@/components/InputCode';
import Modal from '@/components/Modal';
import FixedHeader from '@/components/FixedHeader';

interface Props extends RouteComponentProps<{itemId: string}> {}

const ItemDetails: React.FC<Props> = ({ match }) => {
  const id = +match.params.itemId;

  const [{
    items: itemsLan,
    authorization,
    common,
    catalogs,
  }] = useLanguage();

  const userItem = useSelector(selectUserItem);
  const isLoading = useSelector(loading);
  const isSmallLoading = useSelector(smallLoading);
  const isSaveLoading = useSelector(saveLoading);
  const urlImage = useSelector(selectUrl);
  const [isValidating, setIsValidating] = useToggle();
  const [isActiveModal, setActiveModal] = useToggle();
  const [itemNameValue, setItemNameValue] = useInput();
  const [itemPriceValue, setItemPriceValue] = useInput();
  const [itemCodeValue, setItemCodeValue] = useInput();
  const [valueCustomUnit, setValueCustomUnit] = useInput('');
  const [valueUnit, setValueUnit] = useState({ name: '', id: 0 });
  const [valueImages, setValueImages] = useState('');
  const [descriptionValue, setDescription] = useInput();
  const [isActive, setIsActive] = useToggle();
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [fileToCrop, setFileToCrop] = useState<File>();
  const [isCameItem, setIsCameItem] = useToggle(true);
  const [isInfoModal, setIsInfoModal] = useToggle(false);
  const [isFocus, setIsFocus] = useToggle(false);
  const [isFocusCode, setIsFocusCode] = useToggle(false);
  const units = useSelector(selectUnits);
  const currencyPlaceholder = useSelector(selectPlaceholder);
  const allItems = useSelector(selectUserItems);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const item = allItems.find((itemFind) => itemFind.id === id);
    if (item) {
      dispatch(itemsActions.getItem(item));
    } else {
      dispatch(getUserItem(id));
      dispatch(getUnits());
    }
    
  }, []);

  useEffect(() => {
    setIsCameItem(false);
  }, [userItem]);

  useEffect(() => {
    if (urlImage.length > 0) {
      if (valueImages.length === 0) {
        setValueImages(urlImage);
      } else {
        setValueImages(`${valueImages},${urlImage}`);
      }
    }
    return () => {
      dispatch(itemsActions.changeUrl(''));
    };
  }, [urlImage]);

  useEffect(() => {
    if (userItem) {
      if (userItem.name !== null) setItemNameValue(formatStr(userItem.name));
      if (userItem.code !== null) setItemCodeValue(userItem.code);
      if (userItem.custom_unit_name !== null) {
        setValueCustomUnit(
          formatStr(userItem.custom_unit_name),
        );
      }
      if (userItem.description !== null) setDescription(userItem.description);
      if (userItem.is_listed !== null) setIsActive(userItem.is_listed);
      if (userItem.unit !== null) setValueUnit({ name: userItem.unit, id: userItem.unit_id });
      if (userItem.price !== null) {
        setItemPriceValue(userItem.price.toString());
      } else {
        setItemPriceValue('');
      }
      setValueImages(userItem.images || '');
    }
  }, [userItem]);

  const formatStr = (str: string) => (str ? str.toLowerCase().split(' ').map((word) => (word ? word[0].toUpperCase() + word.slice(1) : '')).join(' ') : '');

  const saveItems = () => {
    if (!isSmallLoading) {
      setIsValidating(true);

      const item = {
        name: itemNameValue,
        description: descriptionValue,
        code: itemCodeValue,
        price: itemPriceValue ? +itemPriceValue : null,
        is_listed: isActive,
        images: valueImages,
        unit_id: valueUnit.id,
        custom_unit_name: valueCustomUnit,
      };

      if (!item.name) {
        scrollTo(260);
        return;
      }

      if (valueUnit.name === 'Custom' && !item.custom_unit_name) {
        scrollTo(460);
        return;
      }
      setIsValidating(false);
      dispatch(editItem(id, item));
    }
  };

  const deleteImage = (imageUrl: string) => () => {
    if (!isSmallLoading) {
      if (valueImages.split(',').length !== 1) {
        const removeImage = valueImages.split(',').filter((image) => image !== imageUrl).join(',');
        setValueImages(removeImage);
      } else {
        setValueImages('');
      }
    }
  };

  const openModalInfo = () => {
    if (valueImages.split(',').length >= 5) {
      setIsInfoModal(true);
    }
  };

  const getImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setFileToCrop(file as File);
      setIsCropOpen(true);
    }
  };

  const saveImage = (file: Blob) => {
    dispatch(getUrl(file));
    setIsCropOpen(false);
  };

  const deleteItem = () => {
    dispatch(deleteUserItem(id));
  };

  const openModal = () => {
    if (!isSmallLoading) setActiveModal(true);
  };

  if (isCropOpen) {
    return (
      <AddImage
        setIsCropOpen={setIsCropOpen}
        saveImage={saveImage}
        file={fileToCrop!}
      />
    );
  }

  return (
    <>
      {isInfoModal && <ModalInfo hideModal={setIsInfoModal} />}
      <FixedHeader>
        <HeaderWrap>
          <HeaderSmallWrap>
            <TopButton onClick={() => history.goBack()}>
              <PlusIcon width="26px" height="26px" />
            </TopButton>
            <AddItemsTitle>
              {!isLoading ? itemNameValue && itemNameValue : <LoaderDots />}
            </AddItemsTitle>
          </HeaderSmallWrap>
        </HeaderWrap>
      </FixedHeader>
      <ItemsContainer focus={isFocus || isFocusCode}>
        {isLoading || isCameItem ? (
          <Loader scale="0.5" />
        ) : (
          <>
            <HideItem>
              <ListItem>{itemsLan.item_list}</ListItem>
              <Switch classTrackingOn="item toggle-off" classTrackingOff="item toggle-on" isActive={isActive} onClick={setIsActive} />
            </HideItem>
            <TextHideItem>{itemsLan.hide_items}</TextHideItem>
            <ImageText>{itemsLan.images}</ImageText>
            <WrapImages imagesLength={valueImages.split(',').length}>
              {isSmallLoading ? (
                <WrapFileLoad>
                  <Loader
                    scale="0.6"
                    width="100%"
                    height="100%"
                  />
                </WrapFileLoad>
              ) : (
                <WrapFile className="item edit add-image" displayWrap={valueImages.split(',').length >= 5} onClick={openModalInfo}>
                  <InputFile getImages={getImages} />
                </WrapFile>
              )}
              {valueImages.length > 0
                && valueImages.split(',').map((image, i) => (
                  <WrapImage key={i}>
                    <Image src={image} alt="item-image" />
                    <DeleteImage className="item delete-image" onClick={deleteImage(image)}>
                      <PlusIcon color="#565758" />
                    </DeleteImage>
                  </WrapImage>
                ))}
            </WrapImages>
            <InputBorder
              setIsFocus={setIsFocus}
              placeholder="e.q Red Apples"
              onChange={setItemNameValue}
              value={itemNameValue}
              label={itemsLan.item_name}
              isError={!itemNameValue && isValidating}
              errorMsg={itemsLan.item_name_required}
              disabled={isSmallLoading}
            />
            <DropDownSelect
              valueUnit={valueUnit}
              setValueUnit={setValueUnit}
              text={itemsLan.unit}
              units={units}
            />
            <EmptyDiv height="15px" />
            {valueUnit.name === 'Custom' && (
              <>
                <InputBorder
                  setIsFocus={setIsFocus}
                  type="text"
                  label={itemsLan.unit_custom}
                  value={valueCustomUnit}
                  onChange={setValueCustomUnit}
                  placeholder={itemsLan.custom}
                  isError={!valueCustomUnit && isValidating}
                  errorMsg={itemsLan.unit_custom_required}
                  disabled={isSmallLoading}
                />
                <EmptyDiv height="3px" />
              </>
            )}
            <InputWrap>
              <InputCurrency
                value={itemPriceValue}
                onChange={setItemPriceValue}
                placeholder={currencyPlaceholder}
                label={itemsLan.item_standard_price}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </InputWrap>
            <WrapArea>
              <TextArea
                setIsFocus={setIsFocus}
                disabled={isSmallLoading}
                descriptionValue={descriptionValue}
                setDescription={setDescription}
                placeholder={catalogs.description_placeholder}
                name={itemsLan.item_description}
              />
            </WrapArea>
            <InputCode
              placeholder={itemsLan.code}
              onChange={setItemCodeValue}
              value={itemCodeValue}
              disabled={isSmallLoading}
              label={itemsLan.item_code}
              onFocus={() => setIsFocusCode(true)}
              onBlur={() => setIsFocusCode(false)}
              isFocus={isFocusCode}
            />
            <DeleteItemWrap className="item delete-item" onClick={openModal}>
              <DeleteItemIcon>
                <DeleteIcon />
              </DeleteItemIcon>
              <DeleteItemText>{itemsLan.item_delete}</DeleteItemText>
            </DeleteItemWrap>
            <ButtonWrap
              isFixed={!(isFocus || isFocusCode)}
              paddingWidth={48}
              maxWidth={504}
              height={76}
            >
              <Button
                classTracking="item cta-save save-item"
                onClick={saveItems}
                shadow
              >
                {isSaveLoading ? <LoaderDots /> : itemsLan.save}
              </Button>
            </ButtonWrap>
          </>
        )}
      </ItemsContainer>

      {isActiveModal && (
        <Modal
          classTrackingBtnLeft="item delete-item cancel-btn"
          classTrackingBtnRight="item delete-item delete-btn"
          confirm={deleteItem}
          closeModal={() => setActiveModal(false)}
          title={authorization.modal_delete_title}
          text={itemsLan.sure_item_delete}
          leftBtn={common.btn_cancel}
          rightBtn={authorization.btn_remove}
        />
      )}
    </>
  );
};

const InputWrap = styled.div`
  margin: 5px 0 7px;
`;

const WrapArea = styled.div`
  margin: 33px 0;
`;

const EmptyDiv = styled.div<{height: string}>`
  height: ${({ height }) => height && height};
`;

const DeleteItemText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #feaa22;
  margin-left: 24px;
`;

const DeleteItemIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const DeleteItemWrap = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-top: 36px;
  margin-bottom: 57px;
`;

const ImageText = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  margin-top: 15px;
`;

const WrapFile = styled.div<{ displayWrap: boolean }>`
  width: 80px;
  height: 80px;
  position: relative;
  display:  ${({ displayWrap }) => displayWrap ? 'none' : 'block'};
`;

const WrapImage = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`;

const WrapFileLoad = styled.div`
  width: 80px;
  height: 80px;
  padding: 15px 0;
  position: relative;
`;

const DeleteImage = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 3px;
  position: absolute;
  top: -10px;
  right: -10px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.22);
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(225deg);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
`;

const WrapImages = styled.div<{ imagesLength: number }>`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: ${({ imagesLength }) => `repeat(${imagesLength + 2}, minmax(80px, 80px))`};
  padding: 12px 0 32px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const TextHideItem = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: 0.1px;
  color: #787c80;
  margin: 14px 0 24px;
`;

const ListItem = styled.div`
  font-size: 16px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #21272e;
  padding-bottom: 3px;
`;

const HideItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderSmallWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AddItemsTitle = styled.div`
  font-size: 17px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.3px;
  color: #21272e;
  margin-left: 28px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  word-break: break-word;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const TopButton = styled.div`
  color: black;
  width: 26px;
  height: 26px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
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

const ItemsContainer = styled.div<{focus: boolean}>`
  width: 100%;
  background-color: #ffffff;
  padding: ${({ focus }) => focus ? '31px 24px 0px 24px' : '31px 24px 76px 24px'};
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

export default ItemDetails;
