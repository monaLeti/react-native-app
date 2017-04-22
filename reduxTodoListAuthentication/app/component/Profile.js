import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';


class Profile extends Component{
  constructor(props){
    super(props)

  }

  render(){

    return (
      <View style={styles.container}>
        <Text>Leti</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:'white'
  }
});


export default Profile
