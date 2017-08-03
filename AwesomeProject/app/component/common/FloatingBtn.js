
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

class FloatingBtn extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View>
        <TouchableHighlight style={styles.addButton}
            underlayColor='#35D0C1' onPress={this.props.onPress}>
            <Icon name="plus" size={40} color='white' style={styles.plusBtn}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addButton:{
    backgroundColor: '#35D0C1',
    borderColor: '#35D0C1',
    borderWidth: 1,
    height: 75,
    width: 75,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
  }
})

export default FloatingBtn
