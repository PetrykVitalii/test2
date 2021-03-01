import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ReactCrop, { Crop } from 'react-image-crop';

import getOrientation from '@/utils/orientation';
import useLanguage from '../common/hooks/useLanguage';
import PlusIcon from '../common/icons/catalogs/PlusIcon';

interface Props {
  file: File;
  saveImage: (data: Blob) => void;
  setIsCropOpen: (status: boolean) => void;
}

const AddImage: React.FC<Props> = ({
  file, saveImage, setIsCropOpen,
}) => {
  const [crop, setCrop] = useState<Crop>({});
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement>();
  const [{ items: itemsLan }] = useLanguage();
  const wrapper = useRef<any>();
  const [exifRotation, setExifRotation] = useState<number>(-1);
  const [size, setSize] = useState({ height: '', width: '' });
  const [fileToCrop, setFileToCrop] = useState<string>('');

  useEffect(() => () => {
    setFileToCrop('');
  }, []);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const result = await getOrientation(file);
        setExifRotation(result);
        setFileToCrop(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    if (loadedImage) {
      const scaleHeight = wrapper.current.clientHeight / loadedImage.naturalHeight;
      const scaleWidth = wrapper.current.clientWidth / loadedImage.naturalWidth;
      const scale = Math.min(scaleHeight, scaleWidth);

      setSize({
        height: `${scale * loadedImage.naturalHeight}px`,
        width: `${scale * loadedImage.naturalWidth}px`,
      });

      const smallSize = Math.min(
        scale * loadedImage.naturalHeight,
        scale * loadedImage.naturalWidth,
      );

      setCrop({
        height: smallSize,
        aspect: 1,
        unit: 'px',
        width: smallSize,
        x:
          window.innerWidth >= scale * loadedImage.naturalWidth
          && window.innerWidth - 1 <= scale * loadedImage.naturalWidth
            ? (window.innerWidth - smallSize) / 2
            : 0,
        y:
          wrapper.current.clientHeight >= scale * loadedImage.naturalHeight
          && wrapper.current.clientHeight - 1 <= scale * loadedImage.naturalHeight
            ? (wrapper.current.clientHeight - smallSize) / 2
            : 0,
      });
    }
  }, [loadedImage]);

  const handleSaveClick = async () => {
    const data = await getCroppedImg(loadedImage!, crop);
    saveImage(data as Blob);
  };

  const onImageLoaded = (image: HTMLImageElement) => {
    setLoadedImage(image);
  };

  const onImageChanged = (data: Crop) => {
    setCrop(data);
  };

  const hideAddImage = () => setIsCropOpen(false);

  const convertRotationToDegrees = (rotation: number) => {
    switch (rotation) {
      case 8:
        return 270;
      case 6:
        return 90;
      case 3:
        return 180;
      default:
        return 0;
    }
  };

  const getCroppedImg = (image: HTMLImageElement, cropSettings: Crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropSettings.width!;
    canvas.height = cropSettings.height!;
    const ctx = canvas.getContext('2d')!;

    const rotationdegrees = convertRotationToDegrees(exifRotation);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationdegrees * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      cropSettings.x! * scaleX,
      cropSettings.y! * scaleY,
      cropSettings.width! * scaleX,
      cropSettings.height! * scaleY,
      0,
      0,
      cropSettings.width!,
      cropSettings.height!,
    );

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/jpeg',
        1,
      );
    });
  };

  return (
    <AddImageWrap height={window.innerHeight}>
      <Header>
        <HeaderWrap>
          <HeaderSmallWrap>
            <TopButton onClick={hideAddImage}>
              <PlusIcon width="26px" height="26px" />
            </TopButton>
            <AddItemsTitle>{itemsLan.item_image}</AddItemsTitle>
          </HeaderSmallWrap>
          <SaveButton className="item other-details add-image cta-save" onClick={handleSaveClick}>{itemsLan.save}</SaveButton>
        </HeaderWrap>
      </Header>
      <ImageWrap ref={wrapper} height={window.innerHeight}>
        {fileToCrop && (
        <ReactCrop
          // locked
          minHeight={120}
          minWidth={120}
          style={{ maxHeight: '100%' }}
          imageStyle={size}
          src={fileToCrop}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onChange={onImageChanged}
          keepSelection
        />
        )}
      </ImageWrap>
    </AddImageWrap>
  );
};

const SaveButton = styled.div`
  width: 85px;
  border-radius: 6px;
  background-image: linear-gradient(117deg, #ff474d, #fa4353);
  padding: 9px 0;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.3px;
  text-align: center;
  box-shadow: 0 7px 15px -3px rgb(133, 131, 131, 47%);
  color: #ffffff;
`;

const ImageWrap = styled.div<{height: number}>`
  max-width: 552px;
  width: 100%;
  margin-top: 72px;
  height: ${({ height }) => height && `calc(${height}px - 72px)`};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  & .ReactCrop__crop-selection{
    border-image: none;
    border: solid 2px #ffffff;
  }
`;

const AddImageWrap = styled.div<{height: number}>`
  position: absolute;
  top: 0;
  max-width: 552px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  height: ${({ height }) => height && `${height}px`};
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
`;

const TopButton = styled.div`
  width: 26px;
  height: 26px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  height: 72px;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px 12px 28px;
`;

export default AddImage;
