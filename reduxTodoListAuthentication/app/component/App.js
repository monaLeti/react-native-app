import React from 'react';
import {connect} from 'react-redux'

import {addTodo,deleteTodos} from '../actions'

import Login from './Login'
import Main from './Main'
import AlertContainer from './alerts/AlertContainer'

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

import NavigatorLog from './Navigator/NavigatorLog'
import NavigatorMain from './Navigator/NavigatorMain'
import NavigatorProfile from './Navigator/NavigatorProfile'
import BottomTabNavigator from './BottomTabNavigator/Tab'

var App = React.createClass({
  renderViewApp(){
    switch (this.props.view) {
      case 'Main':
        return <NavigatorMain/>
      case 'Profile':
        return <NavigatorProfile/>
    }
  },
  render(){
    var renderMainView = () =>{
      if(this.props.user_id){
        return this.renderViewApp()
      }else{
        return (
          <NavigatorLog/>
        );
      }
    }
    var renderBottomView = () =>{
      if(this.props.user_id){
        return(
          <BottomTabNavigator/>
        )
      }
    }
    return(
      <View style={{flex:1}}>
        {renderMainView()}
        <AlertContainer/>
        {renderBottomView()}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id,
    view:state.view
  }
}

export default connect(mapStateToProps)(App);
