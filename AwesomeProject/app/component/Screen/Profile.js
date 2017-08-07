import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import NavigationTabs from './../common/NavigationTabs'

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
        <NavigationTabs/>
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
