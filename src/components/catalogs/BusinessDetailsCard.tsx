/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectCatalog } from '@/store/selectors/catalog';
import { selectCurrency } from '@/store/selectors/user';
import { catalogsActions, sendIsPublicCatalog } from '@/store/actions/catalog';
import calcMultiRangeDate from '@/utils/calcMultiRangeDate';
import checkLn from '@/utils/categoryLn';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import PencilIcon from '@/components/common/icons/PencilIcon';
import TagIcon from '@/components/common/icons/TagIcon';
import ShopIcon from '@/components/common/icons/ShopIcon';
import TruckIcon from '@/components/common/icons/TruckIcon';

import Rectangle from '@/components/catalogs/Rectangle';
import Switch from '@/components/Switch';
import Modal from '@/components/Modal';
import { displayCurrency } from '@/utils/currency';
import formatPrice from '@/utils/formatPrice';
import ClockIcon from '../common/icons/ClockIcon';

interface Props {}

const BusinessDetailsCard: React.FC<Props> = () => {
  const [{ catalogs, common }] = useLanguage();
  const history = useHistory();
  const dispatch = useDispatch();
  const catalog = useSelector(selectCatalog);
  const currency = useSelector(selectCurrency);

  const [openModalSwitch, setOpenModalSwitch] = useToggle();

  if (catalog === null) {
    return null;
  }

  const handleAddDetail = () => {
    history.push(`/catalogs/${catalog.id}/business-details`);
  };

  const freeDelivery = () => {
    const standartCharge = catalog.standart_charge;
    const minOrderValue = catalog.min_order_value;

    let value: string = '';

    if ((standartCharge === 0 && !minOrderValue) || (!standartCharge && minOrderValue === 0)
      || (standartCharge === 0)) {
      value = `${catalogs.free_delivery}`;
    } else if (minOrderValue && (standartCharge === 0 || !standartCharge)) {
      value = `${catalogs.free_delivery_above} ${displayCurrency(currency)}${formatPrice(minOrderValue)}`;
    } else if (standartCharge && (minOrderValue === 0 || !minOrderValue)) {
      value = `${catalogs.delivery_fees_header}: ${displayCurrency(currency)}${formatPrice(standartCharge)}`;
    } else if (standartCharge && minOrderValue) {
      value = `${catalogs.delivery_fees_header}: ${displayCurrency(currency)}${formatPrice(standartCharge)} •
        ${catalogs.free_delivery_above} ${displayCurrency(currency)}${formatPrice(minOrderValue)}`;
    }

    return value;
  };

  const handleChangeIsPublic = () => {
    dispatch(catalogsActions.chengeIsPublic(!catalog.is_public));
    dispatch(sendIsPublicCatalog(catalog.id));
  };

  return (
    <>
      <Wrapper>
        <Header>
          <TitleWrap>
            <Title>{catalogs.publish_catalog}</Title>
            <SwitchWrap>
              <Switch
                classTrackingOn="catalog publish-toggle-off"
                classTrackingOff="catalog publish-toggle-on"
                isActive={catalog.is_public}
                onClick={() => setOpenModalSwitch(true)}
              />
            </SwitchWrap>
          </TitleWrap>
          <SubTitle>
            {catalog.is_public ? catalogs.catalog_switched_on_text : catalogs.catalog_disabled_text}
          </SubTitle>
        </Header>

        <Rectangle
          classTracking="catalog edit-business-details-btn"
          onClick={handleAddDetail}
          icon={<PencilIcon />}
          text={catalogs.edit_details}
          style={{ marginTop: '32px', marginBottom: '40px' }}
        />

        <Row>
          <IconWrap>
            <TagIcon />
          </IconWrap>
          <WrapText>
            <InfoTitle>{catalogs.catalog_category_label}</InfoTitle>
            <Text>{checkLn(catalog.category.name, catalogs)}</Text>
          </WrapText>
        </Row>
        <Row>
          <IconWrap>
            <ClockIcon />
          </IconWrap>
          <WrapText>
            <InfoTitle>{catalogs.operating_hours_label}</InfoTitle>
            <Text>
              {calcMultiRangeDate(
                +catalog.delivery_time_from.slice(0, 2),
                +catalog.delivery_time_to.slice(0, 2),
                true,
                catalogs.operating_hours_day,
              )}
            </Text>
          </WrapText>
        </Row>
        {
          freeDelivery().length > 0 && (
            <Row>
              <IconWrap>
                <TruckIcon />
              </IconWrap>
              <WrapText>
                <InfoTitle>{catalogs.additional_fees_header}</InfoTitle>
                <Text>
                  {freeDelivery()}
                </Text>
              </WrapText>
            </Row>
          )
        }
        {catalog.description && (
          <Row>
            <IconWrap>
              <ShopIcon />
            </IconWrap>
            <WrapText>
              <InfoTitle>{catalogs.about_label}</InfoTitle>
              <AboutText>{catalog.description}</AboutText>
            </WrapText>
          </Row>
        )}
      </Wrapper>
      {openModalSwitch && (
        <Modal
          closeModal={() => setOpenModalSwitch(false)}
          confirm={handleChangeIsPublic}
          title={catalog.is_public
            ? catalogs.disable_catalog
            : catalogs.publish_catalog}
          text={catalog.is_public
            ? catalogs.disable_catalog_text
            : catalogs.catalog_disabled_text}
          leftBtn={common.btn_cancel}
          rightBtn={catalog.is_public ? common.btn_disable : common.btn_publish}
          classTrackingBtnLeft={catalog.is_public ? 'catalog disable-catalog cancel-btn' : 'catalog publish-catalog cancel-btn'}
          classTrackingBtnRight={catalog.is_public ? 'catalog disable-catalog disable-btn' : 'catalog publish-catalog publish-btn'}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  border-radius: 6px;
  background-color: #ffffff;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const AboutText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;

  :first-letter {
    text-transform: capitalize;
  }
`;

const IconWrap = styled.div`
  min-width: 22px;
  min-height: 22px;
  max-width: 22px;
  max-height: 22px;
  margin-right: 24px;
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 28px;
`;

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 48px);
`;

const InfoTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 42px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #21272e;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const SwitchWrap = styled.div``;

export default BusinessDetailsCard;
