import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteCatalog,
  getCatalog,
  catalogsActions,
  sendIsPublicCatalog,
} from '@/store/actions/catalog';
import { selectCatalog } from '@/store/selectors/catalog';
import { loading } from '@/store/selectors/items';
import { getUserItems } from '@/store/actions/items';

import { TAB } from '@/store/reducers/catalog';
import { TabPane, TabsLayout } from '@/components/common/Tabs';

import useLanguage from '@/components/common/hooks/useLanguage';
import useToggle from '@/components/common/hooks/useToggle';

import CopyLink from '@/components/common/icons/catalogs/CopyLink';
import BinIcon from '@/components/common/icons/BinIcon';
import ShareIcon from '@/components/common/icons/ShareIcon';
import Copy from '@/components/common/icons/CopyIcon';

import BackIcon from '@/components/common/icons/BackIcon';
import EyeOffIcon from '@/components/common/icons/EyeOffIcon';
import CheckIcon from '@/components/common/icons/CheckIcon';
import LoaderDots from '@/components/common/LoaderDots';
import Loader from '@/components/common/Loader';
import Spacer from '@/components/common/Spacer';

import BusinessDetailsCard from '@/components/catalogs/BusinessDetailsCard';
import Items from '@/components/catalogs/Items';
import Navigation from '@/components/Navigation';
import Toast from '@/components/Toast';
import Modal from '@/components/Modal';
import FixedHeader from '@/components/FixedHeader';

interface Props extends RouteComponentProps<{ id: string }> {

}

const CatalogDetail: React.FC<Props> = ({ match }) => {
  const location = useLocation<any>();
  const [{ catalogs, authorization, common }] = useLanguage();
  const [linkValue, setLinkValue] = useState<string>('');
  const [copySuccess, setCopySuccess] = useToggle();
  const linkRef = useRef<any>();
  const [openModal, setOpenModal] = useToggle();
  const [openPublishModal, setOpenPublishModal] = useToggle();
  const [showToast, setShowToast] = useToggle();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenPublishModal = () => setOpenPublishModal(true);
  const handleClosePublishModal = () => setOpenPublishModal(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const catalog = useSelector(selectCatalog);
  const isLoadingItems = useSelector(loading);

  const handleBack = () => {
    history.push('/catalogs');
  };

  useEffect(() => {
    dispatch(getCatalog(+match.params.id));
    dispatch(getUserItems());

    if (location.state && Object.prototype.hasOwnProperty.call(location.state, 'showSuccessPopup')) {
      setShowToast(true);
    }
  }, []);

  useEffect(() => {
    let timer: number;

    if (copySuccess) {
      timer = setTimeout(() => {
        setLinkValue(linkValue);
        setCopySuccess(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [copySuccess]);

  useEffect(() => {
    let timer: number;

    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      // Resets the state while clearing up the setTimeout.
      history.replace({ state: undefined });
    };
  }, [showToast]);

  useEffect(() => {
    if (catalog) {
      setLinkValue(`${catalog.short_link}`);
    }
  }, [catalog]);

  if (catalog === null || isLoadingItems) {
    return (
      <>
        <FixedHeader>
          <HeaderWrap>
            <BackIconWrap onClick={handleBack}>
              <BackIcon />
            </BackIconWrap>
            <LoaderDots />
          </HeaderWrap>
        </FixedHeader>
        <Loader scale="0.5" />
      </>
    );
  }
  const { is_public: isPublic } = catalog;

  const handleShare = () => {
    if (!isPublic) {
      handleOpenPublishModal();
      return;
    }

    if (navigator?.share) {
      navigator.share({
        title: 'Agora',
        text: `${authorization.catalog_link_template}\n\n${catalog.short_link.slice(0, catalog.short_link.indexOf('?'))}`,
      });
    } else {
      copyToClipboard();
    }
  };

  const handleChangeIsPublic = () => {
    dispatch(catalogsActions.chengeIsPublic(!isPublic));
    dispatch(sendIsPublicCatalog(catalog.id));
  };

  const copyToClipboard = () => {
    if (!isPublic) return;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(linkValue.slice(0, catalog.short_link.indexOf('?')));
    } else {
      const copyText = linkRef.current.href;

      document.addEventListener('copy', (event) => {
        event.clipboardData?.setData('text/plain', copyText);
        event.preventDefault();
      }, true);

      document.execCommand('copy');
    }
    setCopySuccess(true);
  };

  const handleDeleteCatalog = () => dispatch(deleteCatalog(catalog.id));

  const icon = () => {
    if (copySuccess) {
      return (
        <IconWrap>
          <CheckIcon />
        </IconWrap>
      );
    }
    if (isPublic) {
      return (
        <IconWrapCopy className="catalog copy-link edit" onClick={copyToClipboard}>
          <CopyLink />
        </IconWrapCopy>
      );
    }
    return (
      <IconWrap onClick={handleChangeIsPublic}>
        <EyeOffIcon />
      </IconWrap>
    );
  };

  return (
    <>
      <Toast
        isActive={showToast}
        text={catalogs.catalog_success_message}
        style={{ top: 20, zIndex: 120 }}
        autoClose={0}
      />
      <FixedHeader>
        <HeaderWrap>
          <BackIconWrap onClick={handleBack}>
            <BackIcon />
          </BackIconWrap>
          <TitleWrapper>
            <Title>{catalogs.manage_catalog_header}</Title>
            <SubText>
              {catalog.is_default
                ? catalogs.all_items_header
                : catalog.name}
            </SubText>
          </TitleWrapper>
          <ShareIconWrap
            className="catalog edit share-btn"
            onClick={handleShare}
          >
            {navigator?.share === undefined ? (
              <Copy />
            ) : (
              <ShareIcon />
            )}
          </ShareIconWrap>
        </HeaderWrap>
      </FixedHeader>
      <ScrollView height={window.innerHeight}>
        <Container>
          <Main>
            <CatalogLinkWrap>
              {icon()}

              <LinkWrap>
                <Label>{catalogs.catalog_link_label}</Label>

                {isPublic ? (
                  <CatalogLink
                    ref={linkRef}
                    href={linkValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog preview-catalog-link"
                  >
                    {linkValue
                      .slice(0, linkValue.indexOf('?'))
                      .replace('https://', '')}
                  </CatalogLink>
                ) : (
                  <CatalogLinkDisabled>
                    {linkValue
                      .slice(0, linkValue.indexOf('?'))
                      .replace('https://', '')}
                  </CatalogLinkDisabled>
                )}
              </LinkWrap>
            </CatalogLinkWrap>
          </Main>
          <Spacer height="24px" />
          <TabsLayout>
            <TabPane
              tabId={TAB.Items}
              classTracking="catalog items-tab"
              tabName={catalogs.tab_items_header}
            >
              <Items id={+match.params.id} />
            </TabPane>
            <TabPane
              tabId={TAB.Details}
              classTracking="catalog details-tab"
              tabName={catalogs.tab_details_header}
            >
              <BusinessDetailsCard />
              {!catalog.is_default && (
                <DeleteButtonWrap
                  className="catalog delete-catalog-btn"
                  onClick={handleOpenModal}
                >
                  <BinIcon />
                  <Text>{catalogs.link_delete_catalog}</Text>
                </DeleteButtonWrap>
              )}
            </TabPane>
          </TabsLayout>
          <Toast
            isActive={copySuccess}
            text={authorization.catalog_link_copied}
            style={{
              maxWidth: '504px',
              width: 'calc(100% - 48px)',
              position: 'fixed',
            }}
            bottom={88}
            autoClose={2000}
          />
        </Container>
      </ScrollView>
      <Navigation path="catalogs" />
      {openModal && (
        <Modal
          closeModal={handleCloseModal}
          confirm={handleDeleteCatalog}
          title={catalogs.catalog_delete_title_modal}
          text={catalogs.catalog_delete_text_modal}
          leftBtn={common.btn_cancel}
          rightBtn={common.btn_delete}
          classTrackingBtnLeft="catalog delete-catalog cancel-btn"
          classTrackingBtnRight="catalog delete-catalog delete-btn"
        />
      )}
      {openPublishModal && (
        <Modal
          closeModal={handleClosePublishModal}
          confirm={handleChangeIsPublic}
          title={catalogs.publish_modal_title}
          text={catalogs.publish_modal_text}
          leftBtn={common.btn_cancel}
          rightBtn={common.btn_publish}
          classTrackingBtnLeft="catalog publish-catalog cancel-btn"
          classTrackingBtnRight="catalog publish-catalog publish-btn"
        />
      )}
    </>
  );
};

const ScrollView = styled.div<{ height: number }>`
  min-height: ${({ height }) => height && `calc(${height}px - 72px)`} ;
  background: #fff;
  padding: 30px 0 0;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  width: 100%;
  justify-content: flex-start;
`;

const Container = styled.div`
  padding: 0 24px;
  width: 100%;
`;

const BackIconWrap = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ShareIconWrap = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0px;
  cursor: pointer;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  justify-content: center;
  outline: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;
  text-transform: capitalize;
`;

const SubText = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;

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

const CatalogLinkWrap = styled.div`
  display: flex;
  align-items: center;
`;

const LinkWrap = styled.div`
  position: relative;
  height: 56px;
  width: 100%;
  margin-left: 24px;
`;

const CatalogLink = styled.a`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #3897ff;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  color: #3897ff;
  margin-right: 30px;
`;

const CatalogLinkDisabled = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #909599;
  padding-right: 50px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  padding-bottom: 8px;
  text-transform: uppercase;
`;

const IconWrap = styled.div`
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
`;

const IconWrapCopy = styled.div`
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
  cursor: pointer;
`;

const DeleteButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: 38px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #feaa22;
  margin-top: 5px;
  margin-left: 16px;
`;

export default CatalogDetail;
