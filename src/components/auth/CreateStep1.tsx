import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as H from 'history';

import SmallArrowIcon from '@/components/common/icons/items/SmallArrowIcon';
import CatalogCard from '@/components/catalogs/CatalogCard';
import calcMultiRangeDate from '@/utils/calcMultiRangeDate';
import { selectCatalog } from '@/store/selectors/catalog';
import Button from '@/components/Button';
import { catalogsActions } from '@/store/actions/catalog';
import useLanguage from '../common/hooks/useLanguage';
import ShopIcon from '../common/icons/ShopIcon';
import InfoContainer from './InfoContainer';
import useToggle, { HandleToggle } from '../common/hooks/useToggle';
import MultyRange from '../MultyRange';
import TextArea from '../TextArea';

interface Props {
  history: H.History;
  setIsNextStep: HandleToggle;
}

const CreateStep1: React.FC<Props> = ({ history, setIsNextStep }) => {
  const [{ catalogs, common, authorization }] = useLanguage();
  const [isCategoryError, toggleIsCategoryError] = useToggle();
  const catalog = useSelector(selectCatalog);
  const [leftInput, setLeftInput] = useState<number>(8);
  const [rightInput, setRightInput] = useState<number>(18);
  const [isTextAreaError, setIsTextAreaError] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (catalog && catalog.description) {
      if (catalog.description.length > 350) setIsTextAreaError(true);
      if (catalog.description.length <= 350) setIsTextAreaError(false);
    }
  }, [catalog && catalog.description]);

  useEffect(() => {
    dispatch(
      catalogsActions.setDeliveryTime(
        leftInput < 10 ? `0${leftInput}:00:00` : `${leftInput}:00:00`,
        rightInput < 10 ? `0${rightInput}:00:00` : `${rightInput}:00:00`,
      ),
    );
  }, [leftInput, rightInput]);

  const goToCategory = () => history.push('/setup/step3/category');

  const handleDescription = (value: string) => {
    dispatch(catalogsActions.changeDescription(value));
  };

  const handleNextStep = () => {
    if (!catalog!.category.name) toggleIsCategoryError(true);

    if (!catalog!.category.name) return;
    if (isTextAreaError) return;

    setIsNextStep(true);
  };

  return (
    <>
      <InfoContainer
        classTracking="onboarding info-panel"
        image={<ShopIcon />}
        text={authorization.ready_to_create}
      />
      <CategoryWrap>
        <Text>{catalogs.catalog_category}</Text>
        {catalog && catalog.category.name ? (
          <CatalogCardWrap
            className="catalog business-details cta-select-category"
            onClick={goToCategory}
          >
            <CatalogCard data={catalog.category} icon={<SmallArrowIcon />} />
          </CatalogCardWrap>
        ) : (
          <EmptyCategory
            className="catalog business-details cta-select-category"
            isError={isCategoryError}
            onClick={goToCategory}
          >
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
            {calcMultiRangeDate(leftInput, rightInput, true, catalogs.operating_hours_day)}
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
          descriptionValue={catalog ? catalog.description : ''}
          setDescription={handleDescription}
          isError={isTextAreaError}
          height={96}
          maxLength={350}
          classTracking="onboarding description-input-field"
        />
        <TextAreaLength>
          {`${catalog && catalog.description ? catalog.description.length : '0'} / 350`}
        </TextAreaLength>
      </TextAreaWrap>
      <BtnWrap>
        <Button
          classTracking="onboarding category-details cta-continue"
          shadow
          onClick={handleNextStep}
        >
          {common.btn_continue}
        </Button>
      </BtnWrap>
    </>
  );
};

const BtnWrap = styled.div`
  margin-top: auto;
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

const TextAreaWrap = styled.div`
  margin-top: 65px;
  margin-bottom: 50px;
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
  margin-top: 35px;
  padding: 0 10px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HoursWrap = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
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

const CatalogCardWrap = styled.div`
  margin-top: 16px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #feaa22;
  padding-left: 16px;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
`;

const EmptyCategory = styled.div<{ isError: boolean }>`
  height: 72px;
  padding: 26px 20px 27px;
  margin-top: 16px;
  border-radius: 6px;
  border: ${({ isError }) => (isError ? 'dashed 1px #feaa22' : 'dashed 1px #b4babf')};
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

const CategoryWrap = styled.div`
  margin-top: 27px;
`;

export default CreateStep1;
