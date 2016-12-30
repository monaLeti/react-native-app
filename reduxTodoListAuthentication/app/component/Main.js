import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import SlideMenu from './SlideMenu'
import Filters from './Filter'
import Products from './Product'

var Main = React.createClass({
  render(){
    return (
      <SlideMenu
        renderLeftView = {<Filters/>}
        renderCenterView = {<Products/>} />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main
