import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { ICatalog } from '@/store/reducers/catalogs';
import { catalogsActions } from '@/store/actions/catalog';

import useLanguage from '@/components/common/hooks/useLanguage';

import ShareIcon from '@/components/common/icons/catalogs/ShareIcon';
import Copy from '@/components/common/icons/CopyIcon';
import EyeIcon from '@/components/common/icons/catalogs/EyeIcon';
import Toast from '@/components/Toast';

interface Props {
  catalog: ICatalog;
}

const Card: React.FC<Props> = ({
  catalog,
}) => {
  const [{ catalogs, common, authorization }] = useLanguage();

  const dispatch = useDispatch();

  const [linkValue, setLinkValue] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = () => {
    if (navigator?.share) {
      navigator.share({
        title: 'SELL by Tinvio',
        text: `${authorization.catalog_link_template}\n\n${catalog.short_link.slice(0, catalog.short_link.indexOf('?'))}`,
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(catalog.short_link.slice(0, catalog.short_link.indexOf('?')));
    }

    setCopySuccess(true);
  };

  const history = useHistory();

  const handleCatalogsDetail = () => {
    dispatch(catalogsActions.clearCatalog());
    history.push(`/catalogs/${catalog.id}`);
  };

  useEffect(() => {
    let timer: number;

    if (copySuccess) {
      setLinkValue(authorization.catalog_link_copied);

      timer = setTimeout(() => {
        setLinkValue(linkValue);
        setCopySuccess(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [copySuccess]);

  const getItemsCount = () => {
    if (catalog.is_default) {
      return `${catalogs.all_items_count.replace('{{count}}', `${catalog.items_count}`)}`;
    }

    if (catalog.items_count > 1) {
      return `${catalog.items_count} ${catalogs.step_items}`;
    }
    return `${catalog.items_count} ${common.item_count}`;
  };

  return (
    <Wrapper>
      <Header
        className="catalog-list select-catalog"
        src={catalog.category.image_url}
        alt={catalog.category.name}
        onClick={handleCatalogsDetail}
      />
      <ContentWrap>
        <Title className="catalog-list select-catalog" onClick={handleCatalogsDetail}>
          {catalog.is_default ? catalogs.all_items_header : catalog.name}
        </Title>
        <Footer>
          <TextWrap className="catalog-list select-catalog" onClick={handleCatalogsDetail}>
            <Text>
              {getItemsCount()}
            </Text>
          </TextWrap>
          {catalog.is_public ? (
            <ButtonShare className="catalog-list cta-share" onClick={handleShare}>
              <IconWrap>
                {navigator?.share === undefined ? (
                  <Copy width={18} height={18} style={{ marginRight: 5 }} />
                ) : (
                  <ShareIcon style={{ marginRight: 5 }} />
                )}
              </IconWrap>
              <BtnText>
                {navigator?.share === undefined ? common.copy : common.btn_share}
              </BtnText>
            </ButtonShare>
          ) : (
            <HiddenButton>
              <IconWrap>
                <EyeIcon style={{ marginRight: 5 }} />
              </IconWrap>
              <HiddenText>{catalogs.hidden_label}</HiddenText>
            </HiddenButton>
          )}
          <Toast
            isActive={copySuccess}
            text={authorization.catalog_link_copied}
            style={{
              maxWidth: '504px',
              width: 'calc(100% - 48px)',
              position: 'fixed',
            }}
            autoClose={2000}
            bottom={88}
          />
        </Footer>
      </ContentWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 rgba(120, 124, 128, 0.27);
  background-color: #ffffff;
  margin-bottom: 24px;
  cursor: pointer;
`;

const Header = styled.img`
  height: 127px;
  width: 100%;
  border-radius: 6px 6px 0 0;
  object-fit: cover;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  padding: 20px 20px 28px 20px;

  word-wrap: break-word;
  
  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const TextWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 20px 20px 20px;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
`;

const BtnText = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
`;

const ButtonShare = styled.button`
  border-radius: 4px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  padding: 0 10px;
  outline: none;
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 10;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ContentWrap = styled.div``;

const HiddenButton = styled.div`
  height: 40px;
  border-radius: 4px;
  border: solid 1px #dae1e8;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 10px;
  justify-content: center;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 10;
`;

const IconWrap = styled.div`
  min-width: 16px;
  min-height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenText = styled.p`
  font-family: Manrope3;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #909599;
  white-space: nowrap;
`;

export default Card;
