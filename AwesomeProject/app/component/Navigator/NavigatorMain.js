import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Main from '../Screen/Main'
import AnswersPage from '../Screen/AnswersPage'
import NavigationExperimental from 'react-native-deprecated-custom-components';
class NavigatorMain extends Component {
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
      <NavigationExperimental.Navigator
        initialRoute={{id:'Main'}}
        configureScene={(route)=>{
          return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
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

export default NavigatorMain
