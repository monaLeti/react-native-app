import React from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';

import MenuNavigator from './MenuNavigator'
import SlideMenu from './SlideMenu'
import SlideMenuContent from './SlideMenuContent'
import QuestionsList from './QuestionsList'


var Main = React.createClass({
  onLogout: function(){
    this.props.dispatch(unauthUser)
  },
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
});

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
