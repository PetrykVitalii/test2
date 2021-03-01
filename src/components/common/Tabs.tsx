/* eslint-disable no-undef */
import React from 'react';
import { catalogsActions } from '@/store/actions/catalog';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TAB } from '@/store/reducers/catalog';
import { selectSelectedTab } from '@/store/selectors/catalog';

interface JSXWithProps extends JSX.Element {
  props: TabPaneProps;
}

interface TabsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSXWithProps[];
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const selectedTab = useSelector(selectSelectedTab);
  return (
    <>
      <HeaderWrapper>
        {children.map((tab) => {
          const { tabId, tabName, classTracking } = tab.props;
          return (
            <TabHeader
              key={tabId}
              isActive={tabId === selectedTab}
              onClick={() => dispatch(catalogsActions.setSelectedTab(tabId))}
              className={classTracking}
            >
              {tabName}
            </TabHeader>
          );
        })}
      </HeaderWrapper>
      <ContentWrapper>
        {children.map((tab) => {
          const { tabId, children: content } = tab.props;
          return (
            <TabContent
              key={tabId}
              isActive={tabId === selectedTab}
            >
              {content}
            </TabContent>
          );
        })}
      </ContentWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`;

const TabHeader = styled.div<{ isActive?: boolean }>`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  padding: 18px 10px;
  cursor: pointer;

  color: ${({ isActive }) => (isActive ? '#21272e' : '#909599')};
  border-bottom: ${({ isActive }) => (isActive ? '#21272e 2px solid' : '#dae1e8 1px solid')};
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const TabContent = styled.div<{ isActive?: boolean }>`
  width: 100%;
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

interface TabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  tabId: TAB;
  tabName: string;
  classTracking: string;
}

export const TabPane: React.FC<TabPaneProps> = ({ children }) => (
  <>
    {children}
  </>
);
