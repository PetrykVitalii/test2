/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import styled from 'styled-components';
import { Provider, useSelector } from 'react-redux';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import axios from 'axios';
import { ConnectedRouter } from 'connected-react-router';
import history from 'history';
import html2canvas from 'html2canvas';
import { createActionCreators } from 'immer-reducer';
import JsPDF from 'jspdf';
import moment from 'moment';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { createSelector } from 'reselect';
import { normalize } from 'styled-normalize';

interface Props {
}

const App: React.FC<Props> = () => {
  console.log(normalize);
  console.log(thunk);
  console.log(createSelector);
  console.log(CSSTransition);
  console.log(Provider);
  console.log(Carousel);
  console.log(Dots);
  console.log(axios);
  console.log(ConnectedRouter);
  console.log(history);
  console.log(html2canvas);
  console.log(createActionCreators);
  console.log(JsPDF);
  console.log(moment);
  console.log(isValidPhoneNumber);
  console.log(useSelector);
  console.log(useHistory);
  console.log(Link);
  console.log(createStore);

  const fail = () => {
    const styledC: any = styled;
    console.log(styledC);
    if (Math.random() > 0.5) {
      document.body.style.background = 'red';
    } else {
      document.body.style.background = 'green';
    }
  };

  return (
    <Div onClick={fail}>My1 React and TypeScript App!</Div>
  );
};

const Div = styled.h1`
  font-size: 70px;
  font-weight: 900;
`;

export default App;
