/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Provider} from "react-redux";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './app/component/Main.js'
import Animation from './app/component/Animation.js'

import {configureStore} from './app/store'

export default class reduxTodoList extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Animation/>
      </Provider>
    );
  }
}


AppRegistry.registerComponent('reduxTodoList', () => reduxTodoList);
