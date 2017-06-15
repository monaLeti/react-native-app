import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Profile from '../Profile'
import NavigationExperimental from 'react-native-deprecated-custom-components';
class NavigatorProfile extends Component {
  renderScene(route, nav){
    switch (route.id) {
      case 'Profile':
        return <Profile navigator={nav}/>
    }
  }
  render(){
    return (
      <NavigationExperimental.Navigator
        initialRoute={{id:'Profile'}}
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

export default NavigatorProfile
