import React, { Component } from 'react';
import {connect} from 'react-redux'


import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';


class Notifications extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={{flex:1}}>
        <Text>Notifications</Text>
      </View>
    )
  }
}


export default connect()(Notifications);
