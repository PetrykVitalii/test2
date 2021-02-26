// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useHistory } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import uniqBy from 'lodash/uniqBy';

// import { getPendingOrders } from '@/store/actions/dashboard';
// import { selectOrders } from '@/store/selectors/dashboard';

// import useLanguage from '@/components/common/hooks/useLanguage';
// import useInput from '@/components/common/hooks/useInput';
// import useToggle from '@/components/common/hooks/useToggle';
// import { countItemLn } from '@/utils/dashboardLan';
// import search from '@/utils/search';
// import code from '@/utils/code';

// import SearchIcon from '@/components/common/icons/SearchIcon';
// import BackIcon from '@/components/common/icons/BackIcon';

// import Rectangle from '@/components/dashboard/Rectangle';
// import Status from '@/components/dashboard/Status';
// import Loader from '@/components/common/Loader';
// import FixedHeader from '@/components/FixedHeader';

// const PendingOrders: React.FC = () => {
//   const [{ dashboard, common }] = useLanguage();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const orders = useSelector(selectOrders);

//   const [inputValue, setInputValue] = useInput();

//   const [isFocused, setIsFocused] = useToggle();

//   const handleCloseInput = () => setIsFocused(false);

//   const handleClickinput = () => {
//     setIsFocused(true);
//   };

//   const handleBack = () => history.push('/dashboard');
//   const redirectToPandingOrder = (id: number | string) => history.push(`/pending-orders/${id}`);

//   const searchData = () => {
//     if (!orders) return [];

//     if (inputValue.startsWith('#')) {
//       if (inputValue.length === 1) return orders;
//       const formatInput = inputValue.replace('#', '').toLowerCase();
//       const searchedByCode = orders.filter(({ order }) => order.code.replace('#', '').toLowerCase().startsWith(formatInput));
//       return searchedByCode;
//     }

//     const searchedByName = search(orders, inputValue, ({ order }) => order.full_name);
//     const searchedByBusiness = search(orders, inputValue, ({ order }) => order.business_name ? order.business_name : '');
//     const searchedByCode = search(orders, inputValue, ({ order }) => order.code ? order.code : '');

//     const value = uniqBy(
//       [...searchedByBusiness, ...searchedByName, ...searchedByCode],
//       ({ order }) => order.id,
//     );

//     return value;
//   };

//   const filteredData = searchData();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'auto' });
//     dispatch(getPendingOrders());
//   }, []);

//   useEffect(() => {
//     if (orders && orders.length === 0) {
//       handleBack();
//     }
//   }, [orders]);

//   return (
//     <>
//       <FixedHeader>
//         <HeaderWrap>
//           <BackIconWrap onClick={handleBack}>
//             <BackIcon />
//           </BackIconWrap>
//           <TitleWrap>
//             {isFocused && (
//               <SearchInput
//                 onBlur={handleCloseInput}
//                 value={inputValue}
//                 placeholder={common.search}
//                 onChange={setInputValue}
//                 autoComplete="off"
//                 autoCorrect="off"
//                 spellCheck="false"
//                 autoCapitalize="off"
//                 autoFocus
//               />
//             )}
//             {(!isFocused || inputValue.length < 0) && (
//               <>
//                 <Title>{dashboard.pending_order_headers}</Title>
//                 {orders !== null && !!orders.length && (
//                   <Circle>
//                     <Count>{orders?.length}</Count>
//                   </Circle>
//                 )}
//               </>
//             )}
//           </TitleWrap>
//           <SearchIconWrap className="pending-orders search-btn" onClick={handleClickinput}>
//             <SearchIcon />
//           </SearchIconWrap>
//         </HeaderWrap>
//       </FixedHeader>
//       <ScrollView>
//         {orders === null ? (
//           <Loader scale="0.5" />
//         ) : (
//           <>
//             {filteredData.map(({ order, items }) => (
//               <RectWrap key={order.id}>
//                 <Rectangle
//                   classTracking="pending-orders order-details"
//                   text={order.business_name ? order.business_name : order.full_name}
//                   subText={
//                     items !== null
//                       ? `${code(order.code)} • ${items.length} ${countItemLn(items.length, common)}`
//                       : `0 ${countItemLn(0, common)}`
//                   }
//                   leftIcon={<Status status={order.status} />}
//                   height="72px"
//                   onClick={() => redirectToPandingOrder(order.code)}
//                 />
//               </RectWrap>
//             ))}
//           </>
//         )}
//       </ScrollView>
//     </>
//   );
// };

// const HeaderWrap = styled.div`
//   padding: 0 24px;
//   display: flex;
//   align-items: center;
//   width: 100%;
// `;

// const ScrollView = styled.div`
//   min-height: calc(100vh - 72px);
//   overflow-y: auto;
//   background: #fff;
//   padding: 0 16px;
//   padding-top: 88px;
// `;

// const Title = styled.p`
//   font-size: 18px;
//   font-weight: 800;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   color: #21272e;
// `;

// const BackIconWrap = styled.div`
//   margin-right: 24px;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

// const SearchIconWrap = styled.div`
//   margin-left: auto;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

// const RectWrap = styled.div`
//   margin-bottom: 16px;

//   &:last-child {
//     margin: 0;
//   }
// `;

// const TitleWrap = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Circle = styled.div`
//   background-color: #f43939;
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   margin-left: 11px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding: 0;
// `;

// const Count = styled.p`
//   font-size: 12px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   color: #ffffff;
//   text-align: center;
//   padding: 0;
//   display: inline-block;
//   align-items: center;
//   justify-content: center;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   border: none;
//   height: 30px;
//   font-weight: bold;
//   line-height: 1.5;
//   font-size: 16px;

//   :focus {
//     outline: none;
//   }
// `;

// export default PendingOrders;
