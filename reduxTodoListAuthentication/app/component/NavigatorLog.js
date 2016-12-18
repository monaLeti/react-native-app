import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator
} from 'react-native';

import Login from './Login.js'
import Main from './Main.js'
import SignUpStep1 from './SignUp/SignUpStep1'

var NavigatorLog = React.createClass({
  render(){
    return (
      <Navigator
        initialRoute={{id:'Login'}}
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
