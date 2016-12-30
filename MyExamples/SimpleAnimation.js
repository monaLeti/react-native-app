//  Animations
// Timing is executed once. Spring all the time.


import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      fadeAnim: new Animated.ValueXY({x:0, y:0}),
    };
  }
  componentDidMount(){
    const animationConfig = {
      duration: 2000, // milliseconds
      delay: 1000, // milliseconds
      easing: Easing.in(Easing.ease),
    }

    const value = this.state.fadeAnim;
    const slidingInAnimation = Animated.timing(value, {
      ...animationConfig, // ES6 spread operator
      toValue: {
        x: 200,
        y: 20,
      },
    }).start();

    // Animated.timing(
    //   this.state.fadeAnim,
    //   {toValue:1}
    // ).start()
  }
  getStyle(){
    return
      {transform: this.state.fadeAnim.getTranslateTransform()}
  }
  render(){
    const fadeAnim = this.state.fadeAnim.getTranslateTransform()
    return (
      <Animated.View style={this.getStyle()}>
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
