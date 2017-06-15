import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';

import Login from '../Login.js'
import Main from '../Main.js'
import SignUpStep1 from '../SignUp/SignUpStep1'
import SignUpStep2 from '../SignUp/SignUpStep2'
import SignUpStep3 from '../SignUp/SignUpStep3'

var NavigatorLog = React.createClass({
  render(){
    return (
      <NavigationExperimental.Navigator
        initialRoute={{id:'Login'}}
        configureScene={(route)=>{
          return NavigationExperimental.Navigator.SceneConfigs.VerticalUpSwipeJump
        }}
        renderScene={(route, navigator)=>
          {return this.renderScene(route, navigator)}
        }
      />
    );
  },
  renderScene: function(route, nav){
    switch (route.id) {
      case 'Login':
        return <Login title={route.title} navigator={nav}/>
      case 'Main':
        return <Main title={route.title} navigator={nav}/>
      case 'SignUpStep1':
        return <SignUpStep1 title={route.title} navigator={nav}/>
      case 'SignUpStep2':
        return <SignUpStep2 title={route.title} navigator={nav}/>
      case 'SignUpStep3':
        return <SignUpStep3 title={route.title} navigator={nav}/>
    }
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigatorLog
