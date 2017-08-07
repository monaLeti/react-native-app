import React from 'react';
import { StackNavigator } from 'react-navigation';

import Main from '../Screen/Main.js'
import AnswersPage from '../Screen/AnswersPage.js'

const MainNavigation = StackNavigator(
  {
    Main: {
      screen: Main,
    },
    AnswersPage: {
      screen: AnswersPage,
    }
  },
  {
    mode: 'modal',
    headerMode:'none'
  }
);

export default MainNavigation;
