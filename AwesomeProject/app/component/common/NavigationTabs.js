
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {unauthUser, setView} from '../../actions'

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
  goToProfile(){
    this.props.dispatch(setView('Profile'))
  }
  goToCommunity(){
    this.props.dispatch(setView('Main'))
  }
  goToPromotions(){
    console.log('goToPromotions');
  }
  goToNotifications(){
    console.log('goToNotifications');
  }
  render(){
    return (
      <View style={styles.topNavigation}>
        <View>
          <TouchableHighlight onPress={this.goToProfile.bind(this)} underlayColor='transparent'>
            <Icon name="face" size={45} color='white'/>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={this.goToCommunity.bind(this)} underlayColor='transparent'>
            <Icon name="account-multiple" size={45} color='white'/>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={this.goToPromotions.bind(this)} underlayColor='transparent'>
            <IconIonic name="ios-megaphone" size={45} color='white'/>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={this.goToNotifications.bind(this)} underlayColor='transparent'>
            <Icon name="bell-outline" size={45} color='white'/>
          </TouchableHighlight>
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
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
})
export default connect()(NavigationTabs)
