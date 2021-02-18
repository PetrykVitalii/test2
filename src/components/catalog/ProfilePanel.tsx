/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import styled from 'styled-components';

import { formatPhoneNumberIntl } from 'react-phone-number-input';

import PhoneIcon from '@/components/common/icons/PhoneIcon';
import ShopIcon from '@/components/common/icons/ShopIcon';
import LorryIcon from '@/components/common/icons/LorryIcon';
import TagIcon from '@/components/common/icons/TagIcon';
import WhatsAppIcon from '@/components/common/icons/WhatsAppIcon';
import ClockIcon from '@/components/common/icons/ClockIcon';

import { HandleToggle } from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import categoryLan from '@/utils/categoryLan';
import { checkCurrency } from '@/utils/currency';
import formatStr from '@/utils/formatStr';
import formatPrice from '@/utils/formatPrice';

interface Props {
  catalog: any;
  setIsActiveModal: HandleToggle;
}

const ProfilePanel: React.FC<Props> = ({ catalog, setIsActiveModal }) => {
  const [{ catalog: catalogLan, common }] = useLanguage();

  const calculateHours = (time: string) => {
    const arrTime = time.split(':');
    const hours = +arrTime[0];

    if (hours === 0) {
      return `12${arrTime[1] !== '00' ? `: ${arrTime[1]}` : ''} AM`;
    }

    return hours < 12
      ? `${+hours}${arrTime[1] !== '00' ? `: ${arrTime[1]}` : ''} AM`
      : `${+hours % 12}${arrTime[1] !== '00' ? `: ${arrTime[1]}` : ''} PM`;
  };

  const getMinOrderText = () => {
    const standartCharge = catalog.seller_catalog.standart_charge;
    const minOrderValue = catalog.seller_catalog.min_order_value;

    let value: string = '';

    if ((standartCharge === 0 && !minOrderValue) || (!standartCharge && minOrderValue === 0)
      || (standartCharge === 0)) {
      value = `${catalogLan.free_delivery}`;
    } else if (minOrderValue && (standartCharge === 0 || !standartCharge)) {
      value = `${catalogLan.free_delivery_above} ${checkCurrency(catalog.currency_iso)}${formatPrice(minOrderValue)}`;
    } else if (standartCharge && (minOrderValue === 0 || !minOrderValue)) {
      value = `${catalogLan.delivery_fees}: ${checkCurrency(catalog.currency_iso)}${formatPrice(standartCharge)}`;
    } else if (standartCharge && minOrderValue) {
      value = `${catalogLan.delivery_fees}: ${checkCurrency(catalog.currency_iso)}${formatPrice(standartCharge)} •
        ${catalogLan.free_delivery_above} ${checkCurrency(catalog.currency_iso)}${formatPrice(minOrderValue)}`;
    }

    return value;
  };

  const getWhatsAppMessage = () => {
    const name = catalog.business_name || catalog.supplier_name;
    const str = `${catalogLan.whats_app_catalog
      .replace('{businessName}', formatStr(name))
      .replace('{catalogLink}', catalog.seller_catalog.short_link)}\n\n`;
    return encodeURIComponent(str);
  };

  return (
    <InfoCatalog>
      <InfoWrap>
        <WrapIcon>
          <PhoneIcon />
        </WrapIcon>
        <WrapText>
          <InfoTitle>{catalogLan.phone_label}</InfoTitle>
          <InfoNumber className="buyer-catalog profile-tab call-seller" href={`tel:${catalog.phone}`}>
            {formatPhoneNumberIntl(`+${catalog.phone}`)}
          </InfoNumber>
        </WrapText>
        {common.lan !== 'TH' && (
          <WhatsAppButton
            className="buyer-catalog profile-tab whatsapp-seller-btn"
            href={`https://wa.me/%2B${catalog.phone}?text=${getWhatsAppMessage()}`}
            target="_blank"
          >
            WhatsApp
            <WrapWhatsAppIcon>
              <WhatsAppIcon />
            </WrapWhatsAppIcon>
          </WhatsAppButton>
        )}
      </InfoWrap>
      <>
        <InfoWrap>
          <WrapIcon>
            <ClockIcon />
          </WrapIcon>
          <WrapText>
            <InfoTitle>{catalogLan.operating_hours_label}</InfoTitle>
            <InfoText>
              {(`${calculateHours(catalog.seller_catalog.delivery_time_from)} - ${calculateHours(
                catalog.seller_catalog.delivery_time_to,
              )}`).replace('12 AM - 12 AM', catalogLan.operating_hours_day)}
            </InfoText>
          </WrapText>
        </InfoWrap>
        {catalog.seller_catalog.category.name && (
          <InfoWrap>
            <WrapIcon>
              <TagIcon />
            </WrapIcon>
            <WrapText>
              <InfoTitle>{catalogLan.catalog_category_label}</InfoTitle>
              <InfoText>{categoryLan(catalog.seller_catalog.category.name, catalogLan)}</InfoText>
            </WrapText>
          </InfoWrap>
        )}
        {getMinOrderText().length > 0 && (
          <InfoWrap>
            <WrapIcon>
              <LorryIcon />
            </WrapIcon>
            <WrapText>
              <InfoTitle>{catalogLan.additional_fees_header}</InfoTitle>
              <InfoText>
                {getMinOrderText()}
              </InfoText>
            </WrapText>
          </InfoWrap>
        )}
        {catalog.seller_catalog.description && (
          <InfoWrap>
            <WrapIcon>
              <ShopIcon />
            </WrapIcon>
            <WrapText>
              <InfoTitle>{catalogLan.about_label}</InfoTitle>
              {catalog.seller_catalog.description ? (
                catalog.seller_catalog.description.length > 350 ? (
                  <>
                    <TextOverflow>
                      {`${catalog.seller_catalog.description.slice(0, 350)}...`}
                      <More onClick={setIsActiveModal}>{catalogLan.link_more}</More>
                    </TextOverflow>
                  </>
                ) : (
                  <TextOverflow>{catalog.seller_catalog.description}</TextOverflow>
                )
              ) : null}
            </WrapText>
          </InfoWrap>
        )}
      </>
    </InfoCatalog>
  );
};

const InfoCatalog = styled.div`
  width: 100%;
  padding: 0px 5px;
  margin: 36px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
`;

const WrapIcon = styled.div`
  width: 22px;
  height: 22px;
  margin-top: 5px;
`;

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;

const TextOverflow = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  word-break: break-word;

  /* overflow: hidden; */
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */

  &::first-letter {
    text-transform: uppercase;
  }
`;

const More = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3897ff;
  margin-left: 5px;
  cursor: pointer;
`;

const InfoTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const InfoText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const InfoNumber = styled.a`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #3897ff;
  text-decoration: none;
  cursor: pointer;
`;

const WhatsAppButton = styled.a`
  display: flex;
  padding: 8px 12px;
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  text-decoration: none;
  margin-left: auto;
  margin-top: auto;
  cursor: pointer;
`;

const WrapWhatsAppIcon = styled.div`
  width: 15px;
  height: 15px;
  margin-left: 8px;
`;

export default ProfilePanel;
