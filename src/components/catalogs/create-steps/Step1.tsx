import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { createCatalogActions } from '@/store/actions/createCatalog';
import { selectCatalog, selectCategory } from '@/store/selectors/createCatalog';
import { selectDefaultCatalog } from '@/store/selectors/catalog';
import { IСategory } from '@/store/reducers/categories';

import calcMultiRangeDate from '@/utils/calcMultiRangeDate';
import scrollTo from '@/utils/scrollTo';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import CloseIcon from '@/components/common/icons/CloseIcon';
import CatalogsIcon from '@/components/common/icons/navigation/catalogsIcon';
import CatalogCreateStep from '@/components/CatalogCreateStep';
import CatalogCard from '@/components/catalogs/CatalogCard';
import InfoContainer from '@/components/auth/InfoContainer';
import Loader from '@/components/common/Loader';
import FixedHeader from '@/components/FixedHeader';
import MultyRange from '@/components/MultyRange';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from './Modal';

interface Props {
  handleCloseCreateCategory: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  openModal: boolean;
}

const Step1: React.FC<Props> = ({
  handleCloseCreateCategory,
  handleOpenModal,
  handleCloseModal,
  openModal,
}) => {
  const [{ catalogs, common, authorization }] = useLanguage();
  const catalog = useSelector(selectCatalog);
  const defaultCatalog = useSelector(selectDefaultCatalog);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isNameError, toggleIsNameError] = useToggle();
  const [isCategoryError, toggleIsCategoryError] = useToggle();
  const [isTextAreaError, setIsTextAreaError] = useState<boolean>(false);

  const [catalogDescription, setCatalogDescription] = useState<string | null>('');
  const [catalogCategory, setCatalogCategory] = useState<IСategory | null>();

  const goToCategory = () => history.push('/catalogs/new/step1/category');

  const [leftInput, setLeftInput] = useState<number>(0);
  const [rightInput, setRightInput] = useState<number>(24);

  const history = useHistory();
  const dispatch = useDispatch();

  const category = useSelector(selectCategory);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (defaultCatalog) {
      setCatalogDescription(catalog.description || defaultCatalog.description);

      if (defaultCatalog.description) {
        dispatch(createCatalogActions.setDescription(defaultCatalog.description));
      }

      const deliveryTimeFrom = catalog.operating_hours.time_from.slice(0, 2);
      const deliveryTimeTo = catalog.operating_hours.time_to.slice(0, 2);

      if (deliveryTimeFrom === '00' && deliveryTimeTo === '24') {
        setLeftInput(+defaultCatalog.delivery_time_from.slice(0, 2));
        setRightInput(+defaultCatalog.delivery_time_to.slice(0, 2));
      } else {
        setLeftInput(+deliveryTimeFrom);
        setRightInput(+deliveryTimeTo);
      }

      const categoryInfo: IСategory = category.name ? category : defaultCatalog.category;

      if (!category.name) {
        dispatch(createCatalogActions.setCategory(categoryInfo));
      }

      setCatalogCategory(categoryInfo);
      setIsReady(true);
    }
  }, [defaultCatalog]);

  useEffect(() => {
    dispatch(createCatalogActions.setOperatingHours({
      time_from: leftInput < 10 ? `0${leftInput}:00:00` : `${leftInput}:00:00`,
      time_to: rightInput < 10 ? `0${rightInput}:00:00` : `${rightInput}:00:00`,
    }));
  }, [leftInput, rightInput]);

  useEffect(() => {
    if (catalog.description) {
      if (catalog.description.length > 350) setIsTextAreaError(true);
      if (catalog.description.length <= 350) setIsTextAreaError(false);
    }
  }, [catalog.description]);

  useEffect(() => {
    toggleIsNameError(false);
  }, [catalog.name]);

  useEffect(() => {
    toggleIsCategoryError(false);
  }, [catalog.category_id.name]);

  const handleDescription = (value: string) => {
    setCatalogDescription(value);
    dispatch(createCatalogActions.setDescription(value));
  };

  const handleName = (value: string) => {
    dispatch(createCatalogActions.setName(value));
  };

  const close = () => {
    if (
      catalog.name
      || catalog.category_id.name
      || catalog.description
      || leftInput !== 0
      || rightInput !== 24
    ) {
      handleOpenModal();
    } else {
      handleCloseCreateCategory();
    }
  };

  const handleNextStep = () => {
    if (!catalog.name.trim()) toggleIsNameError(true);

    if (!catalog.category_id.name) toggleIsCategoryError(true);

    if (!catalog.name.trim()) {
      scrollTo(220);
      return;
    }

    if (!catalog.category_id.name) {
      scrollTo(320);
      return;
    }

    if (isTextAreaError) return;

    history.push('/catalogs/new/step2');
  };

  return (
    isReady ? (
      <>
        <FixedHeader>
          <HeaderWrap>
            <IconWrap onClick={close}>
              <CloseIcon />
            </IconWrap>
            <Title>{catalogs.header_catalog}</Title>
          </HeaderWrap>
        </FixedHeader>
        <ScrollView>
          <CatalogCreateStep active={[1, 0, 0]} done={[0, 0, 0]} />
          <FlatList>
            <InfoContainer
              classTracking="create-catalog info-panel"
              image={<CatalogsIcon />}
              text={catalogs.create_a_new}
            />
            <CatalogNameWrap>
              <Input
                value={catalog.name}
                onChange={handleName}
                label={catalogs.catalog_name_label}
                placeholder={catalogs.catalog_name_placeholder}
                isError={isNameError}
                errorMsg={catalogs.catalog_name_error}
              />
            </CatalogNameWrap>

            <CategoryWrap>
              <Text>{catalogs.catalog_category}</Text>
              {catalogCategory && catalogCategory.name ? (
                <CatalogCardWrap className="catalog business-details cta-select-category" onClick={goToCategory}>
                  <CatalogCard
                    data={catalogCategory}
                    icon={<SmallArrowIcon />}
                  />
                </CatalogCardWrap>
              ) : (
                <EmptyCategory className="catalog business-details cta-select-category" isError={isCategoryError} onClick={goToCategory}>
                  {catalogs.category_placeholder}
                  <SmallArrowIcon />
                </EmptyCategory>
              )}
              {isCategoryError && <ErrorMessage>{catalogs.category_error}</ErrorMessage>}
            </CategoryWrap>

            <HoursWrap>
              <SpaceBetween>
                <Text>{catalogs.operating_hours_label}</Text>
                <TextBlack>
                  {calcMultiRangeDate(
                    leftInput, rightInput, true, catalogs.operating_hours_day,
                  )}
                </TextBlack>
              </SpaceBetween>
              <RangeWrap>
                <MultyRange
                  leftInput={leftInput}
                  setLeftInput={setLeftInput}
                  rightInput={rightInput}
                  setRightInput={setRightInput}
                />
              </RangeWrap>
            </HoursWrap>

            <TextAreaWrap>
              <TextArea
                name={catalogs.description_label}
                placeholder={authorization.deliver_within}
                descriptionValue={catalogDescription}
                setDescription={handleDescription}
                isError={isTextAreaError}
                height={96}
                maxLength={350}
              />
              <TextAreaLength>
                {`${catalog.description ? catalog.description.length : '0'} / 350`}
              </TextAreaLength>
            </TextAreaWrap>
            <BtnWrap>
              <Button shadow onClick={handleNextStep}>{common.btn_continue}</Button>
            </BtnWrap>
          </FlatList>
        </ScrollView>
        {openModal && (
          <Modal
            closeModal={handleCloseModal}
            cleanCatalog={handleCloseCreateCategory}
          />
        )}
      </>
    ) : (
      <>
        <Loader />
      </>
    )
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  background: #fff;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
  }
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

const FlatList = styled.div`
  padding: 24px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  /* min-height: calc(100vh - 91px); */
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
`;

const BtnWrap = styled.div`
  margin-top: auto;
`;

const CatalogNameWrap = styled.div`
  margin-top: 43px;
`;

const CategoryWrap = styled.div`
  margin-top: 37px;
`;

const CatalogCardWrap = styled.div`
  margin-top: 16px;
`;

const EmptyCategory = styled.div<{ isError: boolean }>`
  height: 72px;
  padding: 26px 20px 27px;
  margin-top: 16px;
  border-radius: 6px;
  border: ${({ isError }) => isError ? 'dashed 1px #feaa22' : 'dashed 1px #b4babf'};
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #909599;
`;

const HoursWrap = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextBlack = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const RangeWrap = styled.div`
  margin-top: 28px;
  padding: 0 10px;
`;

const TextAreaWrap = styled.div`
  margin-top: 84px;
  margin-bottom: 70px;
`;

const ErrorMessage = styled.p`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
`;

const TextAreaLength = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #787c80;
  margin-top: 6px;
`;

export default Step1;
