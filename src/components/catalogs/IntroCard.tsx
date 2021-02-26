import React from 'react';
import styled, { keyframes } from 'styled-components';

import ShareIcon from '@/components/common/icons/catalogs/ShareIcon';
import ChevronIcon from '@/components/common/icons/ChevronIcon';

import { catalogLn } from '@/utils/catalogLan';

import useLanguage from '@/components/common/hooks/useLanguage';

interface Props {
  handleCreate: () => void;
}

const IntroCard: React.FC<Props> = ({
  handleCreate,
}) => {
  const [{ catalogs: catalogLan, common }] = useLanguage();

  // duplicate the list to create the infinite scroll effect
  const concat = catalogs.concat(catalogs);

  return (
    <Wrapper>
      <ImageWrapper>
        <SlideTrack>
          {concat && concat.map((catalog, index) => (
            <CatalogItemWrapper key={index}>
              <CatalogImage backgroundUrl={`/assets/catalog/${catalog.image}`} />
              <CatalogContent>
                <CatalogText>{catalogLn(catalog.text, catalogLan)}</CatalogText>
                <CatalogDetails>
                  <CatalogCount>
                    {`${catalog.count} ${common.word_items}`}
                  </CatalogCount>
                  <ButtonShare>
                    <IconWrap>
                      <ShareIcon style={{ marginRight: 5 }} width="12" height="12" />
                    </IconWrap>
                    <ShareText>{common.btn_share}</ShareText>
                  </ButtonShare>
                </CatalogDetails>
              </CatalogContent>
            </CatalogItemWrapper>
          ))}
        </SlideTrack>
      </ImageWrapper>
      <ContentWrap>
        <Title>{catalogLan.btn_create_another_catalog}</Title>
        <TextWrap>
          <Text>
            {catalogLan.create_new_catalog_message}
          </Text>
        </TextWrap>
        <ButtonCreate className="catalog-list add-catalog-plus-btn" onClick={handleCreate}>
          <BtnText>{common.btn_create}</BtnText>
          <IconWrap>
            <ChevronIcon width="23" height="23" color="#21272E" />
          </IconWrap>
        </ButtonCreate>
      </ContentWrap>
    </Wrapper>
  );
};

const catalogs: { text: string; image: string; count: number }[] = [
  {
    text: 'Central District',
    image: 'fruits-veg.jpg',
    count: 64,
  },
  {
    text: 'Business Customers',
    image: 'dry-goods.jpg',
    count: 85,
  },
  {
    text: 'Pick-up Only',
    image: 'prepared-food.jpg',
    count: 49,
  },
  {
    text: 'Group Buys',
    image: 'coffee-tea.jpg',
    count: 108,
  },
  {
    text: 'Organic Items',
    image: 'condiments.jpg',
    count: 97,
  },
  {
    text: 'Credit Card Payment',
    image: 'apparel.jpg',
    count: 26,
  },
  {
    text: 'East Java Customers',
    image: 'health-beauty.jpg',
    count: 75,
  },
  {
    text: 'Next Day Delivery',
    image: 'meat-poultry.jpg',
    count: 62,
  },
  {
    text: 'Pre-orders',
    image: 'seasoning-spices.jpg',
    count: 114,
  },
  {
    text: 'Wholesale Orders',
    image: 'beverages.jpg',
    count: 58,
  },
];

const Wrapper = styled.div`
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 rgba(120, 124, 128, 0.27);
  background-color: #ffffff;
  margin-bottom: 24px;
`;

const ContentWrap = styled.div`
  padding: 20px 20px 20px 20px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: #21272e;
  margin-bottom: 16px;
  text-transform: capitalize;
`;

const TextWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #787c80;
`;

const BtnText = styled.p`
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const ButtonCreate = styled.button`
  width: 100%;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  padding: 12px 10px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconWrap = styled.div`
  min-width: 16px;
  min-height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  margin: auto;
  overflow:hidden;
  position: relative;
  width: 100%;
`;

const scrollLeft = keyframes`
  0% { transform: translateX(0) }
  50% { transform: translateX(calc(-239px * 9)) }
  100% { transform: translateX(0) }
`;

const SlideTrack = styled.div`
  display: flex;
  width: calc(235px * 20);
  left: -150px;
  transform: translate3d(0, 0, 0);
  animation: ${scrollLeft} 120s linear infinite;
  padding: 16px 0px 6px 0px;
`;

const CatalogItemWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 174px;
  margin: 0px 6px;
`;

const CatalogContent = styled.div`
  padding: 14px 15px 12px 14px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom-left-radius: 4.3px;
  border-bottom-right-radius: 4.3px;
  border: solid 1px rgba(33, 39, 46, 0.09);
  border-top-style: none;
`;

const CatalogImage = styled.div<{ backgroundUrl: string }>`
  width: 223px;
  height: 90px;
  background-image: url(${({ backgroundUrl }) => backgroundUrl});
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: opacity 0.2s;
  border-top-left-radius: 4.3px;
  border-top-right-radius: 4.3px;
`;

const CatalogDetails = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;
`;

const CatalogText = styled.div`
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const CatalogCount = styled.span`
  font-size: 9px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-transform: lowercase;
  color: #909599;
`;

const ButtonShare = styled.button`
  border-radius: 4px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 0 10px;
  outline: none;
  display: inline-flex;
  align-items: center;
  height: 29px;
  font-size: 9px;
  font-weight: 600;
`;

const ShareText = styled.span`
  font-size: 9px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;
export default IntroCard;
