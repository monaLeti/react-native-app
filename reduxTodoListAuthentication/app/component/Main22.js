import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount(){
    Animated.timing(
      this.state.fadeAnim,
      {toValue:1}
    ).start()
  }
  render(){
    return (
      <Animated.View style={{opacity:this.state.fadeAnim}}>
        <Text>Text</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop:20,
    backgroundColor:'#ddd'
  }
});

export default connect()(Main)
