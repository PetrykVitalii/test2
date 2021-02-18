import React, { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Plus from '@/components/common/icons/Plus';
import InputBorder from '@/components/InputBorder';
import TextArea from '@/components/TextArea';
import useToggle from '@/components/common/hooks/useToggle';
import SearchFlag from '@/components/SearchFlag';
import ItemsContainer from '@/components/ItemsContainer';
import { selectIsCustomPrice } from '@/store/selectors/items';
import { selectOrder, selectUser, selectUserItems } from '@/store/selectors/user';
import { userActions } from '@/store/actions/user';
import useLanguage from '@/components/common/hooks/useLanguage';
import LocalStorage from '@/utils/local-storage';
import { selectCatalog } from '@/store/selectors/catalog';
import formatStr from '@/utils/formatStr';
import formatTextArea from '@/utils/formatTextArea';

interface Props extends RouteComponentProps<{catalogId: string}> {
}

const Quote: React.FC<Props> = ({ history, match }) => {
  const { catalogId } = match.params;
  const [isModalFlag, setIsModalFlag] = useToggle();
  const items = useSelector(selectUserItems);
  const isCustomPrice = useSelector(selectIsCustomPrice);
  const { businessName, fullName } = useSelector(selectUser);
  const { notesQuote: notes } = useSelector(selectOrder);
  const [isValidating, setIsValidating] = useToggle(false);
  const [{ order, quote }] = useLanguage();
  const {
    seller_catalog: { name, is_default: isDefault },
    business_name: businessNameSeller,
  } = useSelector(selectCatalog);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const changeNotes = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  ) => {
    const { target } = e as ChangeEvent<HTMLInputElement>;
    const { value } = target;
    dispatch(userActions.setNotesQuote(formatTextArea(value)));
  };

  const checkInfo = () => {
    setIsValidating(true);
    if (!fullName.trim()) return;

    dispatch(userActions.changeInfo('fullName', formatStr(fullName)));
    dispatch(userActions.changeInfo('businessName', formatStr(businessName)));

    setIsValidating(false);

    LocalStorage.setUserInfo('user', 'fullName', formatStr(fullName));
    LocalStorage.setUserInfo('user', 'businessName', formatStr(businessName));
    LocalStorage.setNotesQuote(notes);

    history.push(`/${catalogId}/signup?quote`);
  };

  if (isModalFlag) {
    return <SearchFlag setIsModalFlag={setIsModalFlag} />;
  }

  return (
    <QouteWrap>
      <Header>
        <PlusWrap onClick={history.goBack}>
          <Plus />
        </PlusWrap>
        <TitleWrap>
          <Title>{quote.quote_details}</Title>
          <SubTitle>
            {isDefault ? businessNameSeller : name}
          </SubTitle>
        </TitleWrap>
      </Header>
      <Empty />
      <Main>
        <WrapItems>
          <ItemsContainer isCustomPrice={isCustomPrice} items={items} />
        </WrapItems>
        <WrapInput>
          <InputBorder
            value={fullName}
            label={order.full_name}
            placeholder={order.palceholder_name}
            isError={isValidating && !fullName.trim()}
            errorMsg={order.name_error}
            keyStr="fullName"
          />
        </WrapInput>
        <WrapInput>
          <InputBorder
            value={businessName}
            label={order.business_name}
            placeholder={order.optional}
            keyStr="businessName"
          />
        </WrapInput>
        <WrapTextArea>
          <TextArea
            setDescription={changeNotes}
            descriptionValue={notes}
            name={quote.notes}
            placeholder={order.optional}
          />
        </WrapTextArea>
        <Button onClick={checkInfo}>{quote.submit_quote_request}</Button>
      </Main>
    </QouteWrap>
  );
};

const WrapTextArea = styled.div`
  margin: 48px 0;
`;

const WrapInput = styled.div`
  margin: 40px 0;
`;

const WrapItems = styled.div`
  margin-bottom: 51px;
`;

const Button = styled.div`
  cursor: pointer;
  box-shadow: 0 14px 30px -8px rgba(94, 22, 22, 0.47);
  border-radius: 6px;
  background-image: linear-gradient(99deg, #ff474d, #fa4353);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.17);
  padding: 15px 0 17px;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

const Empty = styled.div`
  height: 72px;
`;

const Main = styled.div`
  padding: 32px 16px 16px;
  background-color: white;
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
  text-transform: capitalize;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #21272e;
`;

const TitleWrap = styled.div`
  height: 100%;
  margin-left: 24px;
  width: calc(100% - 43px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PlusWrap = styled.div`
  width: 24px;
  height: 24px;
  width: 18px;
  height: 18px;
  transform: rotate(45deg);
`;

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

const QouteWrap = styled.div`
`;

export default Quote;
