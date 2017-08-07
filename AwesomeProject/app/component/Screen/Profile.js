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


class Profile extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={{flex:1}}>
        <Text>Profile</Text>
      </View>
    )
  }
}


export default connect()(Profile);
