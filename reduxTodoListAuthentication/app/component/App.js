import React from 'react';
import {connect} from 'react-redux'

import {addTodo,deleteTodos} from '../actions'

import Login from './Login'
import Main from './Main'
import AlertContainer from './alerts/AlertContainer'

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

import NavigatorLog from './NavigatorLog'
import NavigatorApp from './NavigatorApp'

var App = React.createClass({
  render(){
    var renderMainView = () =>{
      if(this.props.user_id){
        return(
          <NavigatorApp/>
        )
      }else{
        return (
          <NavigatorLog/>
        );
      }
    }
    return(
      <View style={{flex:1}}>
        {renderMainView()}
        <AlertContainer/>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id
  }
}

export default connect(mapStateToProps)(App);
