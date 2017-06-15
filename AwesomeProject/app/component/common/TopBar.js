
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class TopBar extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const {leftItem} = this.props;
    return (
      <View style={styles.topNavBar}>
        <TouchableHighlight onPress={leftItem.onPress} underlayColor='transparent' style={styles.plusButton}>
          <Icon name={leftItem.icon} size={30} color="white"/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:20,
    paddingLeft:10,
    backgroundColor: '#35D0C1',
  },
  plusButton:{
    justifyContent: 'center'
  },
})

export default TopBar
