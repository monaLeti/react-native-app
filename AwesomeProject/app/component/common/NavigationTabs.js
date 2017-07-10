
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';

class NavigationTabs extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.topNavigation}>
        <View>
          <Icon name="face" size={45} color='white'/>
        </View>
        <View>
          <Icon name="account-multiple" size={45} color='white'/>
        </View>
        <View>
          <IconIonic name="ios-megaphone" size={45} color='white'/>
        </View>
        <View>
          <Icon name="bell-outline" size={45} color='white'/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topNavigation:{
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingTop:30,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#35D0C1',
  },
})

export default NavigationTabs
