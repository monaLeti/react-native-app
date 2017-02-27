import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator
} from 'react-native';

import Main from './Main.js'
import AnswersPage from './AnswersPage.js'

class NavigatorApp extends Component {
  renderScene(route, nav){
    switch (route.id) {
      case 'Main':
        return <Main navigator={nav}/>
      case 'AnswersPage':
        return <AnswersPage navigator={nav}/>
    }
  }
  render(){
    return (
      <Navigator
        initialRoute={{id:'Main'}}
        configureScene={(route)=>{
          return Navigator.SceneConfigs.FloatFromRight
        }}
        renderScene={(route, navigator)=>
          {return this.renderScene(route, navigator)}
        }
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigatorApp
