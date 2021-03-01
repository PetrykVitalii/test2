import React, { useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getUrl, itemsActions } from '@/store/actions/items';
import { selectUrl, smallLoading } from '@/store/selectors/items';
import { selectItemById } from '@/store/selectors/emptyItems';
import { emptyItemsActions } from '@/store/actions/emptyItems';

import useInput from '@/components/common/hooks/useInput';
import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import PlusIcon from '@/components/common/icons/catalogs/PlusIcon';
import Loader from '@/components/common/Loader';
import ModalInfo from '@/components/items/ModalInfo';
import AddImage from '@/components/items/AddImage';
import InputCode from '@/components/InputCode';
import InputFile from '@/components/InputFile';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import FixedHeader from '@/components/FixedHeader';
import ButtonWrap from '@/components/common/ButtonWrap';

interface Props extends RouteComponentProps<{ itemId: string }> {}

const AdvancedDetail: React.FC<Props> = ({ match, history }) => {
  const id = match.params.itemId;
  const dispatch = useDispatch();
  const item = useSelector(selectItemById(id));
  const isSmallLoading = useSelector(smallLoading);
  const [code, setCode] = useInput('');
  const [description, setDescription] = useInput('');
  const [images, setImages] = useInput('');
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [fileToCrop, setFileToCrop] = useState<File>();
  const [{ items: itemsLan, catalogs }] = useLanguage();
  const [isFocus, setIsFocus] = useToggle(false);
  const [isInfoModal, setIsInfoModal] = useToggle(false);
  const [isFocusCode, setIsFocusCode] = useToggle(false);

  const urlImage = useSelector(selectUrl);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setCode(item.code);
      setImages(item.images);
    }
  }, [item]);

  useEffect(() => {
    if (urlImage.length > 0) {
      if (images.length === 0) {
        setImages(urlImage);
      } else {
        setImages(`${images},${urlImage}`);
      }
    }

    return () => {
      dispatch(itemsActions.changeUrl(''));
    };
  }, [urlImage]);

  const saveItems = () => {
    if (!isSmallLoading) {
      dispatch(emptyItemsActions.changeInfo('code', id, code));
      dispatch(emptyItemsActions.changeInfo('description', id, description));
      dispatch(emptyItemsActions.changeInfo('images', id, images));

      window.dataLayer.push({
        event: 'agoraItemOtherDetailsSubmit',
        formName: 'Agora Item Other Details Submit',
      });

      history.goBack();
    }
  };

  const openModalInfo = () => {
    if (images.split(',').length >= 5) {
      setIsInfoModal(true);
    }
  };

  const deleteImage = (imageUrl: string) => () => {
    if (images.split(',').length !== 1) {
      const removeImage = images
        .split(',')
        .filter((image) => image !== imageUrl)
        .join(',');

      setImages(removeImage);
    } else {
      setImages('');
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

  if (isCropOpen) {
    return (
      <AddImage
        setIsCropOpen={setIsCropOpen}
        saveImage={saveImage}
        file={fileToCrop!}
      />
    );
  }

  if (!item) {
    return <Redirect to="/add-items" />;
  }

  return (
    <MainWrap>
      {isInfoModal && <ModalInfo hideModal={setIsInfoModal} />}
      <FixedHeader>
        <HeaderWrap>
          <HeaderSmallWrap>
            <TopButton onClick={history.goBack}>
              <PlusIcon width="26px" height="26px" />
            </TopButton>
            <AddItemsTitle>{itemsLan.other_details}</AddItemsTitle>
          </HeaderSmallWrap>
        </HeaderWrap>
      </FixedHeader>
      <Container>
        <Text>{itemsLan.add_images}</Text>
        <WrapImages imagesLength={images.split(',').length}>
          {isSmallLoading ? (
            <WrapFileLoad>
              <Loader scale="0.6" width="100%" height="100%" />
            </WrapFileLoad>
          ) : (
            <WrapFile className="item other-details add-image btn" displayImg={images.split(',').length >= 5} onClick={openModalInfo}>
              <InputFile getImages={getImages} />
            </WrapFile>
          )}
          {images.length > 0
            && images.split(',').map((image, i) => (
              <WrapImage key={i}>
                <Image src={image} alt="iteam-image" />
                <DeleteImage onClick={deleteImage(image)}>
                  <PlusIcon color="#565758" />
                </DeleteImage>
              </WrapImage>
            ))}
        </WrapImages>
        <WrapArea>
          <TextArea
            setIsFocus={setIsFocus}
            descriptionValue={description}
            setDescription={setDescription}
            placeholder={catalogs.description_placeholder}
            name={itemsLan.item_description}
          />
        </WrapArea>
        <InputCode
          placeholder={itemsLan.code}
          onChange={setCode}
          value={code}
          disabled={isSmallLoading}
          label={itemsLan.item_code}
          onFocus={() => setIsFocusCode(true)}
          onBlur={() => setIsFocusCode(false)}
          isFocus={isFocusCode}
          style={{ marginBottom: (isFocus || isFocusCode) ? '45px' : '121px' }}
        />
        <ButtonWrap
          isFixed={!(isFocus || isFocusCode)}
          paddingWidth={48}
          maxWidth={504}
          height={76}
        >
          <Button classTracking="item other-details cta-save save" shadow onClick={saveItems}>
            {itemsLan.save}
          </Button>
        </ButtonWrap>
      </Container>
    </MainWrap>
  );
};

const WrapImage = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
`;

const WrapFileLoad = styled.div`
  width: 90px;
  height: 90px;
  padding: 20px 0;
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
  grid-template-columns: ${({ imagesLength }) => `repeat(${imagesLength + 1}, minmax(80px, 80px))`};
  padding: 12px 0 20px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const WrapArea = styled.div`
  margin: 33px 0;
`;

const WrapFile = styled.div<{ displayImg: boolean }>`
  width: 90px;
  height: 90px;
  display:  ${({ displayImg }) => displayImg ? 'none' : 'block'};
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #21272e;
  padding: 23px 0 0;
`;

const MainWrap = styled.div`
  background: #fff;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
`;

const Container = styled.div`
  padding: 0 24px;
  height: 100%;
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
  letter-spacing: normal;
  color: #21272e;
  margin-left: 25px;
  letter-spacing: 0.3px;
  white-space: nowrap;
`;

const TopButton = styled.div`
  color: black;
  width: 26px;
  height: 26px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
`;

export default AdvancedDetail;
