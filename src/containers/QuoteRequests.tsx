// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useHistory } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';

// import { dashboardActions, getQuotes } from '@/store/actions/dashboard';
// import { selectQuotes } from '@/store/selectors/dashboard';

// import useLanguage from '@/components/common/hooks/useLanguage';
// import useFocusInput from '@/components/common/hooks/useFocusInput';
// import useInput from '@/components/common/hooks/useInput';
// import useToggle from '@/components/common/hooks/useToggle';
// import { countItemLn } from '@/utils/dashboardLan';
// import search from '@/utils/search';

// import SearchIcon from '@/components/common/icons/SearchIcon';
// import BackIcon from '@/components/common/icons/BackIcon';

// import Rectangle from '@/components/dashboard/Rectangle';
// import Loader from '@/components/common/Loader';
// import PastRequests from '@/components/dashboard/PastRequests';

// const QuoteRequests: React.FC = () => {
//   const [{ dashboard, common }] = useLanguage();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const quotes = useSelector(selectQuotes);

//   const [inputValue, setInputValue] = useInput();

//   const [inputRef, focusInput] = useFocusInput();
//   const [isFocused, setIsFocused] = useToggle();

//   const handleCloseInput = () => setIsFocused(false);

//   const handleClickInput = () => {
//     setIsFocused(true);
//     focusInput();
//   };

//   const handleBack = () => history.push('/dashboard');
//   const redirectToQuoteRequest = (id: string) => history.push(`/quote-requests/${id}`);

//   const filteredData = search(quotes === null ? [] : quotes,
//     inputValue, ({ quote }) => quote.full_name);

//   useEffect(() => {
//     dispatch(getQuotes());
//     return () => {
//       dispatch(dashboardActions.clearQuotes());
//     };
//   }, []);

//   const isSearchNotEmpty = Boolean(inputValue);

//   const numberUnViewedQuotes = quotes?.filter((quote) => !quote.quote.is_viewed).length;

//   return (
//     <>
//       <Header>
//         <BackIconWrap onClick={handleBack}>
//           <BackIcon />
//         </BackIconWrap>
//         <TitleWrap>
//           <SearchInput
//             ref={inputRef}
//             onBlur={handleCloseInput}
//             value={inputValue}
//             placeholder={common.search}
//             onChange={setInputValue}
//             autoComplete="off"
//             autoCorrect="off"
//             spellCheck="false"
//             autoCapitalize="off"
//             isFocused={isFocused}
//           />
//           {(!isFocused || inputValue.length < 0) && (
//             <>
//               <Title>{dashboard.header_quote_requests}</Title>
//               {quotes !== null && !!quotes.length && (
//                 <Circle><Count>{numberUnViewedQuotes}</Count></Circle>
//               )}
//             </>
//           )}
//         </TitleWrap>
//         <SearchIconWrap className="pending-orders search-btn" onClick={handleClickInput}>
//           <SearchIcon />
//         </SearchIconWrap>
//       </Header>
//       <Epmty />
//       <ScrollView>
//         {quotes === null ? (
//           <Loader scale="0.5" />
//         ) : (
//           <>
//             {filteredData.filter((quote) => !quote.quote.is_viewed).map(({ quote, items }) => (
//               <RectWrap key={quote.id}>
//                 <Rectangle
//                   classTracking="pending-orders order-details"
//                   text={quote.full_name}
//                   subText={items !== null ? `Sent on ${moment(quote.created_at).format('DD MMM')} • ${items.length} ${countItemLn(items.length, common)}` : `0 ${countItemLn(0, common)}`}
//                   height="72px"
//                   onClick={() => redirectToQuoteRequest(String(quote.id))}
//                 />
//               </RectWrap>
//             ))}
//             <PastRequests
//               data={filteredData.filter((quote) => quote.quote.is_viewed)}
//               isOpen={isSearchNotEmpty}
//             />
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
//   max-width: 552px;
// `;

// const Epmty = styled.div`
//   height: 72px;
// `;

// const ScrollView = styled.div`
//   height: calc(100% - 72px);
//   overflow-y: auto;
//   background: #fff;
//   padding: 16px;
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

//   &:last-child{
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
// `;

// const Count = styled.p`
//   font-size: 12px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   color: #ffffff;
// `;

// const SearchInput = styled.input<{ isFocused: boolean}>`
//   width: 100%;
//   border: none;
//   height: 30px;
//   font-weight: bold;
//   line-height: 1.5;
//   font-size: 16px;
//   display: ${({ isFocused }) => isFocused ? 'flex' : 'none'};

//   :focus {
//     outline: none;
//   }
// `;

// export default QuoteRequests;
