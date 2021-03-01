// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import moment from 'moment';
// import { RouteComponentProps } from 'react-router-dom';
// import { useHistory } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';

// import { clearQuotes, getQuote } from '@/store/actions/dashboard';
// import { selectQuote } from '@/store/selectors/dashboard';
// import { selectPlaceholder } from '@/store/selectors/user';
// import { countItemLn } from '@/utils/dashboardLan';

// import useLanguage from '@/components/common/hooks/useLanguage';

// import ItemsIcon from '@/components/common/icons/dashboard/ItemsIcon';
// import PhoneIcon from '@/components/common/icons/auth/PhoneIcon';
// import WhatsApp from '@/components/common/icons/dashboard/WhatsApp';
// import BackIcon from '@/components/common/icons/BackIcon';

// import Select from '@/components/dashboard/Select';
// import SelectCard from '@/components/dashboard/SelectCard';
// import Loader from '@/components/common/Loader';

// interface Props extends RouteComponentProps<{id: string}> {
// }

// const Quote: React.FC<Props> = ({ match }) => {
//   const [{ authorization, dashboard, common }] = useLanguage();

//   const history = useHistory();
//   const dispatch = useDispatch();

//   const quote = useSelector(selectQuote);
//   const [curr] = useSelector(selectPlaceholder).split(' ');

//   const handleBack = () => {
//     history.goBack();
//   };

//   const sendWhatsApp = () => {
//     const str = dashboard.orderView_wa_button.replace('T-orderRef', '').replace('tokenisedBuyerLink', `${quote?.code}`);

//     return encodeURIComponent(str);
//   };

//   useEffect(() => {
//     dispatch(getQuote(match.params.id));
//     return () => {
//       dispatch(clearQuotes());
//     };
//   }, []);

//   return (
//     <>
//       <Header>
//         <BackIconWrap onClick={handleBack}>
//           <BackIcon />
//         </BackIconWrap>
//         <TitleWrap>
//           <Title>
//             {dashboard.header_quote_details}
//           </Title>
//         </TitleWrap>
//       </Header>
//       <Epmty />
//       <ScrollView>
//         {quote === null ? (
//           <Loader scale="0.5" />
//         ) : (
//           <>
//             <Main>
//               <Details>
//                 <TextWrap>
//                   <DetailsText>{authorization.business_label}</DetailsText>
//                   <DetailsSubText>{quote.quote.business_name}</DetailsSubText>
//                 </TextWrap>
//                 <TextWrap>
//                   <DetailsText>{dashboard.detail_requested_by}</DetailsText>
//                   <DetailsSubText>{quote.quote.full_name}</DetailsSubText>
//                 </TextWrap>
//                 <TextWrap>
//                   <DetailsText>{dashboard.detail_phone}</DetailsText>
//                   <DetailsSubText>{quote.quote.phone_number}</DetailsSubText>
//                 </TextWrap>
//                 <TextWrap>
//                   <DetailsText>{dashboard.detail_sent_on}</DetailsText>
//                   <DetailsSubText>{moment(quote.quote.created_at).format('dd, D MMM')}</DetailsSubText>
//                 </TextWrap>
//               </Details>
//               <SelectWrap>
//                 <Select
//                   classTrackingCollapse="orders item-details-collapse"
//                   classTrackingExpand="orders item-details-expand"
//                   theme={Select.theme.whitesmoke}
//                   icon={<ItemsIcon />}
//                   title={`${quote.items_count} ${countItemLn(quote.items_count, common)}`}
//                   selectContent={(
//                     <>
//                       {quote.items.map((item) => (
//                         <SelectCard
//                           key={item.id}
//                           title={item.name}
//                           text={item.price ? `${curr} ${String(item.price)}` : ''}
//                           unitText={item.unit === 'Custom' ? item.custom_unit_name : item.unit}
//                           isCount={false}
//                         />
//                       ))}
//                     </>
//                   )}
//                 />
//               </SelectWrap>
//             </Main>
//             {
//               quote.quote.notes
//               && (
//                 <LastWrap>
//                   <GreyText>{dashboard.header_notes}</GreyText>
//                   <Text>{quote.quote.notes}</Text>
//                 </LastWrap>
//               )
//             }
//             <Footer>
//               <LinkButton style={{ marginRight: '16px' }}>
//                 <LinkWrap
//                   className="orders call-btn"
//                   href={`tel:+${quote.quote.phone_number}`}
//                 >
//                   {dashboard.btn_call}
//                   <LinkIconWrap>
//                     <PhoneIcon color="#21272e" />
//                   </LinkIconWrap>
//                 </LinkWrap>
//               </LinkButton>
//               <LinkButton>
//                 <LinkWrap
//                   className="orders whatsapp-btn"
//                   href={`https://wa.me/%2B${quote.quote.phone_number}?text=${sendWhatsApp()}`}
//                   target="_blank"
//                 >
//                   {dashboard.btn_whatsapp}
//                   <LinkIconWrap>
//                     <WhatsApp />
//                   </LinkIconWrap>
//                 </LinkWrap>
//               </LinkButton>
//             </Footer>
//           </>
//         )}
//       </ScrollView>
//     </>
//   );
// };

// const Header = styled.div`
//   height: 72px;
//   padding: 0 24px;
//   box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
//   background-color: #ffffff;
//   position: absolute;
//   z-index: 110;
//   display: flex;
//   align-items: center;
//   width: 100%;
// `;

// const Epmty = styled.div`
//   height: 72px;
// `;

// const ScrollView = styled.div`
//   height: calc(100% - 72px);
//   overflow-y: auto;
//   background: #fff;
// `;

// const Main = styled.div`
//   padding-top: 20px;
//   padding-bottom: 8px;
//   border-top: 1px solid #e3e3e3;
// `;

// const LastWrap = styled.div`
//   min-height: 100px;
//   padding: 24px 16px;
//   border-top: 1px solid #e3e3e3;
//   margin-bottom: 100px;
// `;

// const Footer = styled.div`
//   display: flex;
//   padding: 0 16px 16px;
//   position: fixed;
//   align-items: center;
//   bottom: 0;
//   max-width: 552px;
//   width: 100%;
//   background-image: linear-gradient(to top,#ffffff,rgba(255,255,255,0));
// `;

// const Title = styled.p`
//   font-size: 18px;
//   font-weight: 800;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   color: #21272e;

//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const GreyText = styled.p`
//   font-size: 12px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: 1px;
//   color: #909599;
//   text-transform: uppercase;
//   margin-bottom: 16px;
// `;

// const Text = styled.p`
//   font-size: 14px;
//   font-weight: 600;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.43;
//   letter-spacing: normal;
//   color: #21272e;
// `;

// const BackIconWrap = styled.div`
//   margin-right: 24px;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

// const TitleWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
// `;

// const SelectWrap = styled.div`
//   padding: 24px 16px;
// `;

// const LinkButton = styled.div`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   border-radius: 6px;
//   border: solid 1px #dae1e8;
//   background-color: #f0f1f2;
//   cursor: pointer;
// `;

// const LinkIconWrap = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 16px;
//   width: 16px;
//   margin-left: 6px;
// `;

// const LinkWrap = styled.a`
//   outline: none;
//   height: 52px;
//   text-decoration: none;

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   font-size: 15px;
//   font-weight: 600;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   color: #21272e;
// `;

// const Details = styled.div`
//   height: 144px;
//   padding: 16px;
//   margin: 0 16px;
//   border-radius: 6px;
//   border: solid 1px #dae1e8;
// `;

// const TextWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 12px;
// `;

// const DetailsText = styled.p`
//   font-size: 14px;
//   font-weight: 600;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: normal;
//   color: #787c80;
// `;

// const DetailsSubText = styled.p`
//   font-size: 14px;
//   font-weight: 600;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: normal;
//   color: #21272e;
// `;

// export default Quote;
