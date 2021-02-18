/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SearchIcon from '@/components/common/icons/SearchIcon';
import WhatsAppIcon from '@/components/common/icons/WhatsAppIcon';
import useLanguage from '@/components/common/hooks/useLanguage';

import { selectCatalogItems, selectIsCustomPrice } from '@/store/selectors/items';

import Item from '@/components/catalog/Item';
import { Catalog } from '@/store/reducers/catalog';
import formatStr from '@/utils/formatStr';

interface Props {
  catalogId: string;
  openFork: (isPath: boolean) => () => void;
  catalog: Catalog;
}

const ItemsPanel: React.FC<Props> = ({ catalogId, openFork, catalog }) => {
  const [{ catalog: catalogLan, order: orderLan }] = useLanguage();

  const items = useSelector(selectCatalogItems);
  const isCustomPrice = useSelector(selectIsCustomPrice);

  const getWhatsAppMessage = () => {
    const name = catalog.business_name || catalog.supplier_name;
    const str = `${catalogLan.whatsapp_message.replace('{sellerBusinessName}', formatStr(name))}\n\n`;
    return encodeURIComponent(str);
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <SearchItem>
            <SearchText>{catalogLan.select_items_header}</SearchText>
            <Link className="buyer-catalog search-btn" to={`${catalogId}/search`}>
              <WrapIcon>
                <SearchIcon />
              </WrapIcon>
            </Link>
          </SearchItem>
          <ItemsWrap>
            {items.map((item) => (
              <Item isCustomPrice={isCustomPrice} catalogId={catalogId} item={item} key={item.id} />
            ))}
            <Line />
          </ItemsWrap>

          <ButtonWrap>
            <Wrap>
              {/* <GetQuote onClick={openFork(false)}>
                {catalogLan.get_a_quote}
              </GetQuote> */}
              <Continue className="buyer catalog cta-place-order" onClick={openFork(true)}>
                {orderLan.place_order}
              </Continue>
            </Wrap>
          </ButtonWrap>
        </>
      ) : (
        <>
          <NoCatalogWrap>
            <ConversationIcon src="/assets/conversation.png" alt="Conversation" />
            <TextWrap>{catalogLan.no_catalog_message}</TextWrap>
          </NoCatalogWrap>

          <WhatsAppButtonWrap>
            <WhatsAppButton
              className="buyer-catalog profile-tab whatsapp-seller-btn"
              href={`https://wa.me/%2B${catalog.phone}?text=${getWhatsAppMessage()}`}
              target="_blank"
            >
              {catalogLan.contact_seller}
              <WrapWhatsAppIcon>
                <WhatsAppIcon />
              </WrapWhatsAppIcon>
            </WhatsAppButton>
          </WhatsAppButtonWrap>
        </>
      )}
    </>
  );
};

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36px 5px 24px;
  padding-right: 4px;
`;

const SearchText = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.2px;
  color: #909599;
  text-transform: uppercase;
`;

const WrapIcon = styled.div`
  width: 24px;
  height: 24px;
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 58px;
`;

const Line = styled.div`
  height: 1px;
  margin-top: 4px;
  background-color: #ebeced;
`;

const ButtonWrap = styled.div`
  position: fixed;
  width: calc(100% - 32px);
  max-width: 517px;
  bottom: 0;
  background-image: linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0));
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// const GetQuote = styled.div`
//   width: 100%;
//   padding: 12px 0;
//   border-radius: 6px;
//   background-color: #f0f1f2;
//   font-size: 15px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.33;
//   letter-spacing: 0.3px;
//   text-align: center;
//   color: #21272e;
//   box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.17);
//   margin-right: 8px;
// `;

const Continue = styled.div`
  width: 100%;
  padding: 12px 0;
  border-radius: 6px;
  background-image: linear-gradient(106deg, #ff474d, #fa4353 100%);
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.3px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.17);
  cursor: pointer;
  /* margin-left: 8px; */
`;

const NoCatalogWrap = styled.div`
  height: calc(100vh - 465px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-height: 647px) {
    height: 100%;
    margin-top: 38px;
  }
`;

const ConversationIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 13px;
`;

const TextWrap = styled.div`
  max-width: 225px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: center;
  color: #787c80;
`;

const WhatsAppButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #21272e;
  text-decoration: none;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: 24px;
  cursor: pointer;

  @media (max-height: 647px) {
    margin-bottom: 0px;
  }
`;

const WrapWhatsAppIcon = styled.div`
  width: 15px;
  height: 15px;
  margin-left: 8px;
`;

const WhatsAppButtonWrap = styled.div`
  position: fixed;
  width: calc(100% - 32px);
  max-width: 517px;
  bottom: 0;

  @media (max-height: 647px) {
    position: relative;
    width: 100%;
    margin-top: 38px;
  }
`;

export default ItemsPanel;
