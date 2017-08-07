import React, { Component } from 'react';
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
  TextInput,
  TouchableOpacity
} from 'react-native';

import NavigatorLog from './Navigator/NavigatorLog'
import NavigatorMain from './Navigator/NavigatorMain'
import NavigatorProfile from './Navigator/NavigatorProfile'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }
  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  renderViewApp(){
    switch (this.props.view) {
      case 'Main':
        return <NavigatorMain/>
      case 'Profile':
        return <NavigatorProfile/>
    }
  }
  render(){
    console.log('Location', this.state.latitude, this.state.longitude, this.props.user_id);
    var renderMainView = () =>{
      if(this.props.user_id){
        return this.renderViewApp()
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id,
    view:state.view
  }
}

export default connect(mapStateToProps)(App);
