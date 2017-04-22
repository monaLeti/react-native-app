'use strict'
import React, { Component } from 'react';
import {connect} from 'react-redux'


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Tab extends Component {
  constructor(props){
    super(props)
    this.state = {
      elementSelected:'Main'
    }
  }
  componentWillReceiveProps(){

  }
  changeView(value){
    this.setState({
      elementSelected:value.view
    })
  }
  colorIconChange(value){
    if (value.view === this.state.elementSelected) {
      return '#35D0C1'
    }else{
      return '#c4c4c4'
    }
  }
  colorTextChange(value){
    if (value.view === this.state.elementSelected) {
      return {color:'#35D0C1'}
    }else{
      return {color:'#c4c4c4'}
    }
  }
  render(){
    let elementsMenu = elements.map((value, index) => (
      <View
        style={styles.elements}
        key={index}
        value={value}>
        <TouchableHighlight onPress={this.changeView.bind(this, value)} underlayColor='transparent'>
          <Icon name={value.icon} size={20} color={this.colorIconChange(value)}/>
        </TouchableHighlight>
        <Text style={this.colorTextChange(value)}>{value.view}</Text>
      </View>)
    );
    return(
      <View style={styles.topNavBar}>
        {elementsMenu}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    borderTopWidth:1,
    borderTopColor:"#c4c4c4",
    backgroundColor: 'white',
  },
  elements:{
    alignItems:'center',
  },
})

const elements = [
  {
    view:'Main',
    icon:'home-variant'
  },
  {
    view:'Profile',
    icon:'account-circle'
  },
]

export default Tab
