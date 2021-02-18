/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import CloseIcon from '@/components/common/icons/CloseIcon';
import ItemsContainer from '@/components/ItemsContainer';
import WhatsAppIcon from '@/components/common/icons/WhatsAppIcon';
import ConfirmIcon from '@/components/common/icons/ConfirmIcon';
import {
  allPrice, delivery, total, tax,
} from '@/utils/price';
import { checkCurrency } from '@/utils/currency';
import useLanguage from '@/components/common/hooks/useLanguage';
import CancelledIcon from '@/components/common/icons/CancelledIcon';
import ShippedIcon from '@/components/common/icons/ShippedIcon';
import DeliveredIcon from '@/components/common/icons/DeliveredIcon';
import MenuIcon from '@/components/common/icons/MenuIcon';
import { selectIsComming, selectPersonalOrder } from '@/store/selectors/order';
import Loader from '@/components/Loader';
import { getOrder, orderActions } from '@/store/actions/order';
import { FullItem } from '@/store/reducers/items';
import formatPrice from '@/utils/formatPrice';
import SentIcon from '@/components/common/icons/SentIcon';
import Toast from '@/components/Toast';
import DownloadIcon from '@/components/common/icons/NewDownloadIcon';
import CopyIcon from '@/components/common/icons/CopyIcon';
import reviewCode from '@/utils/reviewCode';
import useToggle from '@/components/common/hooks/useToggle';
import Menu, { IMenuItem } from '@/components/Menu';
import formatStr from '@/utils/formatStr';

interface Props extends RouteComponentProps<{orderId: string}> {}

const PersonalOrder: React.FC<Props> = ({ history, match }) => {
  const { orderId } = match.params;
  const {
    items,
    order,
    seller_full_name: sellerFullName,
    seller_business_name: sellerBusinessName,
    catalog,
    city,
    currency_iso: currencyIso,
    seller_phone: sellerPhone,
  } = useSelector(selectPersonalOrder);
  const isComming = useSelector(selectIsComming);
  const [{ order: orderLan, common }] = useLanguage();
  const [newItems, setNewItems] = useState<FullItem[]>([]);
  const [showToast, setShowToast] = useToggle(false);
  const [text, setText] = useState<string>(orderLan.catalog_link_copied);
  const [isPdfLoading, setIsPdfLoading] = useToggle();
  const [openMenu, setOpenMenu] = useToggle();

  const dispatch = useDispatch();

  useEffect(() => {
    setNewItems(items.reduce((acc: FullItem[], itemsWithCount) => {
      const newItem: FullItem = {
        ...itemsWithCount.item,
        count: itemsWithCount.count,
      };
      acc.push(newItem);
      return acc;
    }, []));
  }, [items]);

  useEffect(() => {
    let timer: any;

    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    dispatch(getOrder(orderId));

    return () => {
      dispatch(orderActions.setIsComming(false));
    };
  }, []);

  const StatusOrder = (status: string) => {
    if (status.toLowerCase() === 'confirmed') {
      return {
        src: <ConfirmIcon />,
        text: orderLan.status_processed,
        desc: orderLan.status_processed_desc,
        color: '#e5f4f5',
      };
    }
    if (status.toLowerCase() === 'pending') {
      return {
        src: <SentIcon />,
        text: orderLan.sent,
        desc: orderLan.sent_desc,
        color: '#eaf4ff',
      };
    }
    if (status.toLowerCase() === 'shipped') {
      return {
        src: <ShippedIcon />,
        text: orderLan.status_shipped,
        desc: orderLan.status_shipped_desc,
        color: '#f2f4fa',
      };
    }
    if (status.toLowerCase() === 'delivered') {
      return {
        src: <DeliveredIcon />,
        text: orderLan.status_delivered,
        desc: orderLan.status_delivered_desc,
        color: '#e5f4f5',
      };
    }
    return {
      src: <CancelledIcon />,
      text: orderLan.status_cancelled,
      desc: orderLan.status_cancelled_desc,
      color: '#fff8eb',
    };
  };

  const formatDate = () => (common.lan === 'ZH-CN'
    ? moment(order.delivery_date).locale(common.lan.toLowerCase()).format('dddd, M月 DD日')
    : moment(order.delivery_date).locale(common.lan.toLowerCase()).format('ddd, DD MMMM'));

  const sendWhatsApp = () => {
    const str = orderLan.whats_app_message;

    const message = str.replace('{orderRef}', order.code).replace('{tokenisedBuyerLink}', window.location.href);

    return encodeURIComponent(message);
  };

  const calculateTax = (): number => tax(order.tax_amount, newItems, catalog.is_custom_pricing_enabled);

  const calculatePrice = (): number => allPrice(newItems, catalog.is_custom_pricing_enabled);

  const calculateTotal = (): number => total(calculateDelivery, calculateTax, calculatePrice);

  const calculateDelivery = () => delivery(
    catalog.min_order_value,
    catalog.standart_charge,
    newItems,
    orderLan.free,
    catalog.is_custom_pricing_enabled,
  );

  const exportToPdf = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsPdfLoading(true);
    const elem = document.getElementById('order') as HTMLElement;
    const elemWidth = 552;
    let elemHeight = elem.scrollHeight + ((items.length || 0) * 64);

    if (document.getElementById('itemsContainer')) {
      if (window.getComputedStyle(document.getElementById('itemsContainer')!).display === 'block') {
        elemHeight = elem.scrollHeight;
      }
    }

    await html2canvas(elem, {
      width: elemWidth,
      height: elemHeight,
      scale: 2,
      onclone: (document) => {
        if (document.getElementById('footer')) {
          document.getElementById('footer')!.style.visibility = 'hidden';
        }
        if (document.getElementById('root')) {
          document.getElementById('root')!.style.width = '552px';
        }
        if (document.getElementById('order')) {
          document.getElementById('order')!.style.width = '552px';
        }
        if (document.getElementById('itemsContainer')) {
          document.getElementById('itemsContainer')!.style.display = 'block';
        }
        if (document.getElementById('info')) {
          document.getElementById('info')!.style.wordBreak = 'break-all';
        }
        if (document.getElementById('notes')) {
          document.getElementById('notes')!.style.wordBreak = 'break-all';
        }
        if (document.getElementById('title')) {
          document.getElementById('title')!.style.display = 'block';
          const titles = document.querySelectorAll('#title')!;
          titles.forEach((title: any) => {
            title.style.display = 'block';
            title.style.overflow = 'auto';
            title.style.whiteSpace = 'none';
            title.style.wordBreak = 'break-all';
          });
        }
      },
    }).then((canvas) => {
      const img = canvas.toDataURL('image/png', 1);

      const pdf = new JsPDF('p', 'pt', [595, elemHeight]);

      pdf.addImage(img, 'PNG', (595 - elemWidth) / 2, 0, elemWidth, elemHeight);

      pdf.save(`${orderLan.order_count} ${reviewCode(order.code)} - SELL by Tinvio.pdf`);
    });
    setIsPdfLoading(false);
    setOpenMenu(false);
  };

  const copyMessage = () => {
    const str = `Tinvio ${orderLan.order} T-${order.code}\n${formatStr(order.full_name)}\n${order.delivery_date ? `${orderLan.delivery_on} ${moment(order.delivery_date).locale(common.lan.toLowerCase()).format('ddd, DD MMMM YYYY')}\n` : ''}`;
    const itemText = newItems.reduce(
      (acc, item) => (acc += `${item.count} x ${item.unit !== 'Custom' ? item.unit : formatStr(item.custom_unit_name)} x ${formatStr(item.name)} \n`),
      str,
    );
    const userInfo = `${order.business_name ? `${formatStr(order.business_name)} • ` : ''}${formatStr(order.delivery_address)}, ${formatStr(city)} ${order.post_code}\n${orderLan.if_there_are_any_issues.replace("{Seller's Name}", formatStr(sellerFullName)).replace('{+62 88888 88888}', formatPhoneNumberIntl(`+${sellerPhone}`))}\n${orderLan.сonfirm_order}: ${window.location.href}`;
    return encodeURIComponent(itemText + userInfo);
  };

  const handleSaveText = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setText(orderLan.catalog_link_copied);
    setShowToast(true);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(decodeURIComponent(copyMessage()));
    }
    setOpenMenu(false);
  };

  const menuItems: IMenuItem[] = [
    {
      id: 1,
      name: orderLan.btn_copy_details,
      icon: CopyIcon,
      onClick: handleSaveText,
    },
    {
      id: 2,
      name: orderLan.btn_download_pdf,
      icon: DownloadIcon,
      onClick: exportToPdf,
    },
  ];

  if (!isComming) {
    return <Loader />;
  }

  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <>
      <Header>
        <PlusWrap onClick={() => history.push(`/catalogs/${catalog.code}`)}>
          <CloseIcon />
        </PlusWrap>
        <TitleWrap>
          <Title>{sellerBusinessName || sellerFullName}</Title>
          <SubTitle>
            {`${orderLan.order} #${order.code}`}
          </SubTitle>
        </TitleWrap>
        <MenuWrap onClick={handleOpenMenu} isOpen={openMenu}>
          <MenuIcon />
        </MenuWrap>
      </Header>

      <Empty />
      <Main id="order">
        <Toast
          isActive={showToast}
          text={text}
          style={{ top: 20, backgroundColor: '#006e6e', zIndex: 120 }}
          autoClose={0}
        />
        <Wrap>
          <Status>
            <IconBox color={StatusOrder(order.status).color}>
              <StatusWrap>{StatusOrder(order.status).src}</StatusWrap>
            </IconBox>
            <DescriptionWrapper>
              <StatusText>{StatusOrder(order.status).text}</StatusText>
              <StatusDesc>{StatusOrder(order.status).desc}</StatusDesc>
            </DescriptionWrapper>
          </Status>
          {catalog.is_delivery_date_choosable
              && (
                <>
                  <OrderCode>
                    <OrderText>{orderLan.delivery_on}</OrderText>
                    <Code>{formatDate()}</Code>
                  </OrderCode>
                </>
              )}
        </Wrap>
        <WrapContainer>
          <ItemsContainer
            classTrackingCollapse="buyer order-view item-details-collapse"
            classTrackingExpand="buyer order-view item-details-expand"
            isCount
            items={newItems}
            isCustomPrice={catalog.is_custom_pricing_enabled}
            isImage={false}
          />
        </WrapContainer>
        <Line />
        <Wrap>
          <InfoWrap>
            <Info weight="600" margin="24px 0 13px" color="#787c80">
              {orderLan.sub_total}
            </Info>
            <Info weight="600" margin="24px 0 13px" color="#21272e">
              {`${checkCurrency(
                currencyIso,
              )}${formatPrice(calculatePrice())}`}
            </Info>
          </InfoWrap>
          <InfoWrap>
            <Info weight="600" margin="13px 0 20px" color="#787c80">
              {orderLan.delivery_charges}
            </Info>
            <Info weight="600" margin="13px 0 20px" color="#21272e">
              {`${
                typeof calculateDelivery() !== 'string'
                  ? `${checkCurrency(currencyIso)}`
                  : ''
              }${formatPrice(calculateDelivery())}`}
            </Info>
          </InfoWrap>
          { order.tax_amount && calculateTax() > 0 && (
          <InfoWrap>
            <Info weight="600" margin="13px 0 20px" color="#787c80">
              {`${orderLan.taxes} (${order.tax_amount}%)`}
            </Info>
            <Info weight="600" margin="13px 0 20px" color="#21272e">
              {`${checkCurrency(
                currencyIso,
              )}${formatPrice(calculateTax())}`}
            </Info>
          </InfoWrap>
          )}
          <Line />
          <InfoWrap>
            <Info weight="bold" margin="19px 0 27px" color="#21272e">
              {orderLan.total}
            </Info>
            <Info weight="bold" margin="19px 0 27px" color="#21272e">
              {`${checkCurrency(
                currencyIso,
              )}${formatPrice(calculateTotal())}`}
            </Info>
          </InfoWrap>
        </Wrap>
        {order.notes && (
          <>
            <Line />
            <Wrap>
              <InfoTitle>{orderLan.order_notes}</InfoTitle>
              <InfoNote id="notes" weight="600" margin="16px 0 24px" color="#21272e">
                {order.notes}
              </InfoNote>
            </Wrap>
          </>
        )}
        <Line />
        <Wrap>
          <InfoTitle>{orderLan.delivery_details}</InfoTitle>
          <Info id="info" weight="600" margin="16px 0 24px" color="#21272e">
            {`${order.full_name.toLowerCase()} • ${order.business_name ? `${order.business_name.toLowerCase()} • ` : ''}${
              order.delivery_address.toLowerCase()
            }, ${city.toLowerCase()} ${order.post_code}`}
          </Info>
        </Wrap>
        <Wrap id="footer">
          <Support
            className="buyer order-view cta-contact-seller"
            href={`https://wa.me/%2B${sellerPhone}?text=${sendWhatsApp()}`}
            target="_blank"
          >
            <SupportText>{orderLan.contact_seller}</SupportText>
            <WhatsAppWrap>
              <WhatsAppIcon />
            </WhatsAppWrap>
          </Support>
        </Wrap>
      </Main>
      {openMenu && (
        <Menu closeMenu={handleCloseMenu} menuItems={menuItems} loading={{ isLoading: isPdfLoading, itemId: 2 }} />
      )}
    </>
  );
};

const Header = styled.div`
  height: 72px;
  padding: 12px 24px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  max-width: 552px;
`;

const Empty = styled.div`
  height: 72px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleWrap = styled.div`
  height: 100%;
  margin-left: 24px;
  width: calc(100% - 83px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const MenuWrap = styled.div<{isOpen: boolean}>`
  min-width: 40px;
  min-height: 40px;
  margin: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ isOpen }) => (isOpen ? '50%' : 'none')};
  background-blend-mode: ${({ isOpen }) => (isOpen ? 'multiply' : '')};
  background-image: ${({ isOpen }) => (isOpen ? 'linear-gradient(to bottom, #f0f1f2, #f0f1f2)' : '')};
`;

const PlusWrap = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const StatusText = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #21272e;
`;

const StatusWrap = styled.div`
  width: 24px;
  height: 24px;
`;

const IconBox = styled.div<{color: string}>`
  padding: 14px;
  border-radius: 8.7px;
  border: solid 2.2px rgba(33, 39, 46, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color && color};
`;

const Status = styled.div`
  padding: 10px 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  margin: 24px 0;
`;

const Code = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

const OrderText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const OrderCode = styled.div`
  padding: 18px 16px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 16px;
`;

const Support = styled.a`
  display: flex;
  padding: 15px 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 6px;
  border: solid 1px #dae1e8;
  background-color: #f0f1f2;
  text-decoration: none;
`;

const WhatsAppWrap = styled.div`
  width: 14px;
  height: 14px;
  margin-left: 8px;
  margin-bottom: 5px;
`;

const SupportText = styled.div`
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #21272e;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  height: 1px;
  background-color: #ebeced;
`;

const WrapContainer = styled.div`
  padding: 0 16px 32px;
`;

const Wrap = styled.div`
  padding: 0 16px;
`;

const InfoNote = styled.div<{color: string, margin: string, weight: string}>`
  font-size: 14px;
  font-weight: ${({ weight }) => weight && weight};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ color }) => color && color};
  margin: ${({ margin }) => margin && margin};
  word-break: break-word;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Info = styled.div<{color: string, margin: string, weight: string}>`
  font-size: 14px;
  font-weight: ${({ weight }) => weight && weight};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: ${({ color }) => color && color};
  margin: ${({ margin }) => margin && margin};
  text-transform: capitalize;
  word-break: break-word;
`;

const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  margin: 24px 0 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #909599;
`;

const Main = styled.div`
  padding: 0 0 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StatusDesc = styled.div`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 16px;
`;

export default PersonalOrder;
