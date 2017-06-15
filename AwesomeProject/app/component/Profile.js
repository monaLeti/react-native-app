import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import TopBar from './common/TopBar'

class Profile extends Component{
  constructor(props){
    super(props)

  }
  backbutton(){
    console.log('backbutton');
  }
  logOutUser(){
    this.props.dispatch(unauthUser())
  }
  render(){
    return (
      <View style={styles.container}>
        <TopBar
          leftItem={{
            icon:'ios-add-circle-outline',
            onPress:this.backbutton
          }}/>
        <TouchableOpacity onPress={this.logOutUser.bind(this)}>
          <Text>Log out</Text>
        </TouchableOpacity>
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


export default connect()(Profile)
