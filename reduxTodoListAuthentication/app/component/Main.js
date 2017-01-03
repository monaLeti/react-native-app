import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import MenuNavigator from './MenuNavigator'
import SlideMenu from './SlideMenu'
import SlideMenuContent from './SlideMenuContent'
import QuestionsList from './QuestionsList'

class Main extends Component{
  onLogout(){
    this.props.dispatch(unauthUser)
  }
  
  render(){
    return (
      <View style={styles.container}>
        <MenuNavigator/>
        <SlideMenu
          renderLeftView = {<SlideMenuContent/>}
          renderCenterView = {<QuestionsList/>} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop:20,
    backgroundColor:'#ddd'
  },
  text:{
    color:'black',
    fontSize:18
  }
});

export default connect()(Main)
