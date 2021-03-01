/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import dates from '@/utils/dates';

import { getOrder, dashboardActions, editStatusOrder } from '@/store/actions/dashboard';
import {
  selectFilteredOrders,
  selectIsLoadingCancel,
  selectIsLoadingConfirm,
  selectIsLoadingDelivered,
  selectIsLoadingShipOrder,
  selectIsUpcomingDeliveriesOnly,
  selectOrder,
  selectStatusFilters,
} from '@/store/selectors/dashboard';
import { selectPlaceholder } from '@/store/selectors/user';
import {
  allPrice, delivery, total, tax,
} from '@/utils/price';
import { countItemLn, statusLn, dayWeekLn } from '@/utils/dashboardLan';
import code from '@/utils/code';
import unitsLan from '@/utils/unitsLan';
import formatPrice from '@/utils/formatPrice';
import formatStr from '@/utils/formatString';

import useToggle from '@/components/common/hooks/useToggle';
import useLanguage from '@/components/common/hooks/useLanguage';

import Download from '@/components/common/icons/dashboard/Download';
import Copy from '@/components/common/icons/dashboard/Copy';
import Close from '@/components/common/icons/dashboard/Close';
import WhatsApp from '@/components/common/icons/dashboard/WhatsApp';
import Check from '@/components/common/icons/dashboard/Check';
import ShareIcon from '@/components/common/icons/auth/ShareIcon';
import BackIcon from '@/components/common/icons/BackIcon';
import Loader from '@/components/common/Loader';
import LoaderDots from '@/components/common/LoaderDots';

import Button from '@/components/dashboard/Button';
import StatusCard from '@/components/dashboard/StatusCard';
import Select from '@/components/dashboard/Select';
import SelectCard from '@/components/dashboard/SelectCard';
import Status from '@/components/dashboard/Status';
import FixedHeader from '@/components/FixedHeader';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';

interface Props extends RouteComponentProps<{ id: string }> {}

const Order: React.FC<Props> = ({ match }) => {
  const [{ authorization, dashboard, common }] = useLanguage();

  const [isCancelModal, setIsCancelModal] = useToggle();
  const [isShipModal, setIsShipModal] = useToggle();
  const [isDeliveredModal, setIsDeliveredModal] = useToggle();
  const [isPdfLoading, setIsPdfLoading] = useToggle();

  const [copySuccess, setCopySuccess] = useToggle();
  const [showToast, setShowToast] = useToggle();
  const [toastText, setToastText] = useState('');
  const [toastBackground, setToastBackground] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const isLoadingCancel = useSelector(selectIsLoadingCancel);
  const isLoadingConfirm = useSelector(selectIsLoadingConfirm);
  const isLoadingDelivered = useSelector(selectIsLoadingDelivered);
  const isLoadingShipOrder = useSelector(selectIsLoadingShipOrder);
  const filteredOrders = useSelector(selectFilteredOrders);
  const statusFilters = useSelector(selectStatusFilters);
  const showUpcomingDeliveriesOnly = useSelector(selectIsUpcomingDeliveriesOnly);
  const [curr] = useSelector(selectPlaceholder).split(' ');

  useEffect(() => {
    const loading = isLoadingCancel
    || isLoadingConfirm
    || isLoadingDelivered
    || isLoadingShipOrder
    || false;

    setIsLoading(loading);
  }, [isLoadingCancel, isLoadingConfirm, isLoadingDelivered, isLoadingShipOrder]);

  const handleCancelOrder = async () => {
    
    setIsCancelModal(false);
    setIsShipModal(false);
    await dispatch(editStatusOrder(order!.order.id, 'Cancelled'));
    setToastText(dashboard.order_cancelled_success);
    setToastBackground('#feaa22');
    setShowToast(true);
  };

  const handleConfirm = async () => {
    
    await dispatch(editStatusOrder(order!.order.id, 'Confirmed'));
    setToastText(dashboard.order_confirmed_success);
    setToastBackground('#6faba1');
    setShowToast(true);
  };

  const handleShipped = async () => {
    setIsShipModal(false);
    await dispatch(editStatusOrder(order!.order.id, 'Shipped'));
    setToastText(dashboard.order_shipped_success);
    setToastBackground('#8e85b7');
    setShowToast(true);
  };

  const handleDelivered = async () => {
    
    setIsDeliveredModal(false);
    await dispatch(editStatusOrder(order!.order.id, 'Delivered'));
    setToastText(dashboard.order_delivered_success);
    setToastBackground('#6faba1');
    setShowToast(true);
  };

  const handleBack = () => {
    dispatch(dashboardActions.cleanOrder());

    if (filteredOrders !== null) {
      let compare = filteredOrders!.slice()
        .sort((a, b) => +b.order.created_at - +a.order.created_at);

      if (statusFilters.length) {
        const filters = statusFilters.map((status) => status.key.toLowerCase().trim());
        compare = compare.filter((_order) => filters.includes(
          _order.order.status.toLowerCase().trim(),
        ));
      }

      if (showUpcomingDeliveriesOnly) {
        compare = compare.filter((_order) => _order.delivery_date >= moment(new Date()).startOf('day').valueOf());
      }

      if (compare.length === 1) {
        dispatch(dashboardActions.cleanFilteredOrder());
        dispatch(dashboardActions.setStatusFilters([]));
      }
    }

    history.push('/orders');
  };

  const sendWhatsApp = () => {
    const str = dashboard.orderView_wa_button
      .replace('orderRef', `${order?.order.code}`)
      .replace('tokenisedBuyerLink', `${order?.order.link}`);

    return encodeURIComponent(str);
  };

  const handleShare = () => {
    if (navigator?.share) {
      navigator.share({
        title: 'Agora',
        text: dashboard.orderView_share_button
          .replace('orderRef', `${order?.order.code}`)
          .replace('tokenisedBuyerLink', `${order?.order.link}`),
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(decodeURIComponent(copyMessage()));
    }

    setCopySuccess(true);
  };

  const copyMessage = () => {
    const str = `Tinvio ${common.order_count} T-${order?.order.code}\n${formatStr(order!.order.full_name)}\n${order?.order.delivery_date ? `${dashboard.delivery_on}${moment(order?.order.delivery_date).locale(common.lan.toLowerCase()).format('ddd, DD MMMM YYYY')}\n` : ''}`;
    const itemText = order?.items.reduce(
      (acc, item) => (acc += `${item.count} x ${item.item.unit !== 'Custom' ? item.item.unit : formatStr(item.item.custom_unit_name)} x ${formatStr(item.item.name)} \n`),
      str,
    );
    const userInfo = `${order?.order.business_name ? `${formatStr(order?.order.business_name)} • ` : ''}${formatStr(order!.order.delivery_address)}, ${formatStr(order!.order.city)} ${order?.order.post_code}\n${dashboard.if_there_are_any_issues.replace("{Seller's Name}", formatStr(order!.seller_full_name)).replace('{+62 88888 88888}', formatPhoneNumberIntl(`+${order?.seller_phone}`))}\n${dashboard.сonfirm_order}: ${window.location.href}`;
    return encodeURIComponent(itemText + userInfo);
  };

  const checkTheme = (status: string) => {
    switch (status) {
      case 'Pending':
        return StatusCard.theme.blue;
      case 'Cancelled':
        return StatusCard.theme.yellow;
      case 'Confirmed':
        return StatusCard.theme.green;
      case 'Shipped':
        return StatusCard.theme.purple;
      case 'Delivered':
        return StatusCard.theme.green;
      default:
        return StatusCard.theme.green;
    }
  };

  const calculatePrice = (): number => allPrice(
    order!.items, order!.catalog.is_custom_pricing_enabled,
  );

  const calculateTotal = (): number => total(calculateDelivery, calculateTax, calculatePrice);

  // const calculateDelivery = () => delivery(
  //   order!.catalog.min_order_value,
  //   order!.catalog.standart_charge,
  //   order!.items,
  //   `${dashboard.free}`,
  //   order!.catalog.is_custom_pricing_enabled,
  // );

  const calculateDelivery = () => delivery(
    +order!.delivery_charge,
    `${dashboard.free}`,
  );

  const calculateTax = () => tax(
    order!.order.tax_amount || 0,
    order!.items,
    order!.catalog.is_custom_pricing_enabled,
  );

  const deliveryDetailsText = () => {
    const text = [];

    if (order?.order.business_name) text.push(`${order.order.business_name} • `);
    text.push(`${order?.order.delivery_address} • `);
    text.push(`${order?.city ? order.city : ''} `);
    text.push(`${order?.order.post_code}`);

    return text.join('');
  };

  const checkPrice = (customPrice: number | null, price: number | null): number | undefined => {
    if (order?.catalog.is_custom_pricing_enabled && customPrice) {
      return customPrice;
    }
    if (price) return price;
  };

  useEffect(() => {
    let timer: number;

    if (copySuccess) {
      timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    dispatch(dashboardActions.cleanOrder());
    dispatch(getOrder(match.params.id));
  }, []);

  const classTrack = () => {
    if (order!.order.status === 'Shipped') {
      return 'orders shipped cta-cancel';
    }
    if (order!.order.status === 'Pending') {
      return 'orders pending cta-cancel';
    }
    if (order!.order.status === 'Confirmed') {
      return 'orders confirmed cta-cancel';
    }
    return '';
  };

  const exportToPdf = async () => {
    setIsPdfLoading(true);
    const elem = document.getElementById('order') as HTMLElement;
    const elemWidth = 552;
    let elemHeight = elem.scrollHeight + ((order?.items.length || 0) * 64 + 30);

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
        if (document.getElementById('last')) {
          document.getElementById('last')!.style.marginBottom = '0px';
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
        if (document.getElementById('name')) {
          document.getElementById('name')!.style.wordBreak = 'break-all';
        }
        if (document.getElementById('notes')) {
          document.getElementById('notes')!.style.wordBreak = 'break-all';
        }
        if (document.getElementById('whatsApp')) {
          document.getElementById('whatsApp')!.style.display = 'none';
        }
        if (document.getElementById('title')) {
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

      pdf.save(`${common.order_count} ${code(order?.order.code || '')} - SELL by Tinvio.pdf`);
    });
    setIsPdfLoading(false);
  };

  const formatDate = (date: number) => {
    const day = moment(date).format('dddd');
    return `${common.lan === 'ZH-CN' ? `${dayWeekLn(day, common)}, ` : ''} ${dates(moment(date), common.lan, 'dddd, MMM D')}`;
  };

  const getStatusCardText = () => {
    const orderStatus = order?.order.status.toLowerCase();

    switch (orderStatus) {
      case 'confirmed':
        return dashboard.processed_sub_text;
      case 'pending':
        return dashboard.pending_sub_text;
      case 'shipped':
        return dashboard.shipped_sub_text;
      case 'delivered':
        return dashboard.delivered_sub_text;
      case 'cancelled':
        return dashboard.cancelled_sub_text;
      default:
        return '';
    }
  };

  return (
    <>
      {
        isLoading ? (
          <Loader scale="0.5" />
        ) : (
          <>
            <Toast
              isActive={showToast}
              text={toastText}
              style={{
                top: 20,
                backgroundColor: toastBackground,
                maxWidth: '520px',
                width: 'calc(100% - 32px)',
                zIndex: 120,
                position: 'fixed',
              }}
              padding={16}
              autoClose={0}
            />
            <FixedHeader>
              <HeaderWrap>
                <BackIconWrap onClick={handleBack}>
                  <BackIcon />
                </BackIconWrap>
                <TitleWrap>
                  {order === null ? (
                    <LoaderDots />
                  ) : (
                    <>
                      <Title>
                        {order.order.business_name
                          ? order.order.business_name
                          : order.order.full_name}
                      </Title>
                      {order.order.code && <Code>{`#${order.order.code}`}</Code>}
                    </>
                  )}
                </TitleWrap>
                <IconWrap onClick={handleShare} className="orders share-icon">
                  <ShareIcon />
                </IconWrap>
              </HeaderWrap>
            </FixedHeader>
            <ScrollView>
              {order === null ? (
                <Loader scale="0.5" />
              ) : (
                <>
                  <HeaderButtons id="buttons">
                    <Button
                      icon={<Copy />}
                      text={dashboard.copy_details}
                      style={{ marginRight: 16 }}
                      theme={Button.theme.snow}
                      onClick={copyToClipboard}
                      classTracking="orders copy-details"
                    />

                    <Button
                      icon={<Download />}
                      text={dashboard.download_pdf}
                      theme={Button.theme.snow}
                      classTracking="orders download-pdf"
                      onClick={exportToPdf}
                      isLoader={isPdfLoading}
                    />
                  </HeaderButtons>
                  <Wrap id="order">
                    <Main>
                      <StatusCard
                        icon={<Status status={order.order.status} width={24} height={24} />}
                        title={statusLn(order.order.status, common)}
                        text={getStatusCardText()}
                        theme={checkTheme(order.order.status)}
                      />
                      {
                  order.order.delivery_date && (
                  <DeliveryDateWrapper>
                    <Label>{dashboard.delivery_on}</Label>
                    <Value>{formatDate(order.order.delivery_date)}</Value>
                  </DeliveryDateWrapper>
                  )
                }
                      <SelectWrap>
                        <Select
                          classTrackingCollapse="orders item-details-collapse"
                          classTrackingExpand="orders item-details-expand"
                          theme={Select.theme.whitesmoke}
                          title={`${order.items.length} ${countItemLn(order.items.length, common)}`}
                          selectContent={(
                            <>
                              {[...order.items]
                                .sort((a, b) => (a.item.name > b.item.name ? 1 : -1))
                                .map((item) => (
                                  <SelectCard
                                    key={item.item.id}
                                    title={item.item.name}
                                    text={item.item.code ? code(item.item.code) : item.item.code}
                                    price={checkPrice(item.item.custom_price, item.item.price)}
                                    unitText={
                                item.item.unit === 'Custom'
                                  ? item.item.custom_unit_name
                                  : unitsLan(item.item.unit, common)
                              }
                                    countItem={item.count}
                                  />
                                ))}
                            </>
                    )}
                        />
                      </SelectWrap>
                    </Main>
                    <DescWrap>
                      <PriceWrap>
                        <GreyTextLower>{dashboard.subtotal_label}</GreyTextLower>
                        <Text>{`${curr}${formatPrice(calculatePrice())}`}</Text>
                      </PriceWrap>
                      <PriceWrap>
                        <GreyTextLower>{dashboard.delivery_charges_label}</GreyTextLower>
                        <Text>{`${typeof calculateDelivery() !== 'string' ? `${curr}` : ''}${formatPrice(calculateDelivery())}`}</Text>
                      </PriceWrap>
                      { order!.order.tax_amount && calculateTax() > 0 && (
                      <PriceWrap>
                        <GreyTextLower>{`${dashboard.taxes_label} (${order!.order.tax_amount}%)`}</GreyTextLower>
                        <Text>{`${curr}${formatPrice(calculateTax())}`}</Text>
                      </PriceWrap>
                      )}
                      <TotalWrap>
                        <BoldText>{dashboard.total_label}</BoldText>
                        <BoldText>{`${curr}${formatPrice(calculateTotal())}`}</BoldText>
                      </TotalWrap>
                    </DescWrap>
                    {order.order.notes && (
                    <DescWrap>
                      <GreyText>{dashboard.order_notes_header}</GreyText>
                      <DescText id="notes">{order.order.notes}</DescText>
                    </DescWrap>
                    )}
                    <DescWrap>
                      <GreyText>{dashboard.customer_details_header}</GreyText>
                      <Text id="name">{order.customer_full_name}</Text>
                      <WhatsAppWrap>
                        <BlueText
                          href={`tel:+${order.customer.phone_number}`}
                          className="orders call-customer"
                        >
                          {formatPhoneNumberIntl(`+${order.customer.phone_number}`)}
                        </BlueText>
                        <WhatsAppLink
                          id="whatsApp"
                          className="orders whatsapp-btn"
                          href={`https://wa.me/%2B${order.customer.phone_number}?text=${sendWhatsApp()}`}
                          target="_blank"
                        >
                          {dashboard.btn_whatsapp}
                          <WhatsAppIconWrap>
                            <WhatsApp width={16} height={16} />
                          </WhatsAppIconWrap>
                        </WhatsAppLink>
                      </WhatsAppWrap>
                    </DescWrap>
                    <LastWrap id="last">
                      <GreyText>{dashboard.delivery_details_header}</GreyText>
                      <Text id="info">{deliveryDetailsText()}</Text>
                    </LastWrap>
                    {(order.order.status === 'Shipped'
                || order.order.status === 'Confirmed'
                || order.order.status === 'Pending') && (
                <Footer id="footer">
                  <Button
                    icon={<Close />}
                    text={common.btn_cancel}
                    style={{ marginRight: 16 }}
                    onClick={setIsCancelModal}
                    classTracking={classTrack()}
                    isLoader={isLoadingCancel}
                  />
                  {order.order.status === 'Pending' && (
                    <Button
                      classTracking="orders pending cta-confirm"
                      icon={<Check />}
                      text={common.btn_confirm}
                      theme={Button.theme.primary}
                      onClick={handleConfirm}
                      isLoader={isLoadingConfirm}
                    />
                  )}
                  {order.order.status === 'Shipped' && (
                    <Button
                      classTracking="orders shipped cta-delivered"
                      text={common.status_delivered}
                      theme={Button.theme.primary}
                      onClick={setIsDeliveredModal}
                      isLoader={isLoadingDelivered}
                    />
                  )}
                  {order.order.status === 'Confirmed' && (
                    <Button
                      classTracking="orders confirmed cta-ship-order"
                      text={dashboard.btn_ship_order}
                      theme={Button.theme.primary}
                      onClick={setIsShipModal}
                      isLoader={isLoadingShipOrder}
                    />
                  )}
                </Footer>
                    )}
                  </Wrap>
                  <Toast
                    isActive={copySuccess}
                    text={authorization.order_link_copied}
                    style={{
                      maxWidth: '520px',
                      width: 'calc(100% - 32px)',
                      position: 'fixed',
                    }}
                    bottom={86}
                    padding={16}
                    autoClose={2000}
                  />
                </>
              )}
            </ScrollView>
            {isCancelModal && (
            <Modal
              title={dashboard.cancel_title_modal}
              text={dashboard.cancel_text_modal}
              leftBtn={common.btn_no}
              rightBtn={dashboard.cancel_btn_confirm}
              closeModal={() => setIsCancelModal(!isCancelModal)}
              confirm={handleCancelOrder}
              classTrackingBtnLeft="orders cancel-order no-btn"
              classTrackingBtnRight="orders cancel-order cancel-btn"
            />
            )}
            {isShipModal && (
            <Modal
              title={dashboard.ship_title_modal}
              text={dashboard.ship_text_modal}
              leftBtn={common.btn_cancel}
              rightBtn={dashboard.ship_btn_confirm}
              closeModal={() => setIsShipModal(!isShipModal)}
              confirm={handleShipped}
              classTrackingBtnLeft="orders ship-order cancel-btn"
              classTrackingBtnRight="orders ship-order yes-btn"
            />
            )}
            {isDeliveredModal && (
            <Modal
              title={dashboard.order_title_modal}
              text={dashboard.order_text_modal}
              leftBtn={common.btn_cancel}
              rightBtn={dashboard.order_btn_confirm}
              closeModal={() => setIsDeliveredModal(!isDeliveredModal)}
              confirm={handleDelivered}
              classTrackingBtnLeft="orders deliver-order cancel-btn"
              classTrackingBtnRight="orders deliver-order yes-btn"
            />
            )}
          </>
        )
      }
    </>
  );
};
const Wrap = styled.div``;

const HeaderWrap = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

const ScrollView = styled.div`
  overflow-y: auto;
  background: #fff;
  min-height: calc(100vh - 72px);

  @media screen and (min-width: 552px) {
    min-height: calc(100vh - 152px);
    padding-bottom: 40px;
  }
`;

const Main = styled.div`
  padding-top: 20px;
  padding-bottom: 8px;
  /* border-top: 1px solid #e3e3e3; */
`;

const DescWrap = styled.div`
  min-height: 100px;
  padding: 24px 16px;
  border-top: 1px solid #e3e3e3;
`;

const LastWrap = styled.div`
  min-height: 100px;
  padding: 24px 16px;
  border-top: 1px solid #e3e3e3;
  margin-bottom: 100px;

  @media screen and (min-width: 552px) {
    margin-bottom: 20px;
  }
`;

const Footer = styled.div`
  display: flex;
  padding: 0 16px 0 16px;
  position: fixed;
  bottom: 0px;
  max-width: 552px;
  width: 100%;
  height: 68px;
  background-image: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));

  @media screen and (min-width: 552px) {
    bottom: 40px;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #e3e3e3;
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
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const GreyText = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  color: #909599;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const GreyTextLower = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
  word-break: break-word;

  text-transform: capitalize;
`;

const DescText = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;

  word-wrap: break-word;

  ::first-letter {
    text-transform: capitalize;
  }
`;

const BoldText = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #21272e;
`;

const BlueText = styled.a`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #3897ff;

  text-decoration: none;
`;

const BackIconWrap = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconWrap = styled.div`
  min-width: 24px;
  max-width: 24px;
  height: 24px;
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Code = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const SelectWrap = styled.div`
  padding: 24px 16px;
`;

const PriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 13px;

  &:last-child {
    margin: 0;
    padding-bottom: 20px;
    border-bottom: solid 1px #ebeced;
  }
`;

const TotalWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #ebeced;
  padding-top: 20px;
`;

const WhatsAppWrap = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WhatsAppIconWrap = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  width: 16px;
  margin-left: 6px;
`;

const WhatsAppLink = styled.a`
  border-radius: 6px;
  border: solid 1px rgba(33, 39, 46, 0.12);
  background-color: #fcfcfc;
  outline: none;
  height: 36px;
  width: 106px;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const DeliveryDateWrapper = styled.div`
  margin: 16px 16px 0 16px;
  padding: 18px 16px;
  border-radius: 8px;
  border: solid 1px #dae1e8;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #787c80;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: right;
  color: #21272e;
`;

export default Order;
