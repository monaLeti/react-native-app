'use strict'

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Animation,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width

class SlideMenu extends Component{
  // componentWillMount: function (){
  //   this.offset = 0 //Contains the center view offset from the left edge
  //   this._panGesture = PanResponder.create({
  //     onMoveShouldSetPanResponder: (evt, gestureState) => {
  //       return Math.abs(gestureState.dx) >  Math.abs(gestureState.dy)
  //         &&  Math.abs(gestureState.dx) > 10
  //     },
  //     onPanResponderGrant : (evt, gestureState) => this.left = 0, //he guesture has started.
  //     onPanResponderMove : (evt, gestureState) => this.moveCenterView(gestureState.dx),
  //     onPanResponderRelease : (evt, gestureState) => this.moveFinished,
  //     onPanResponderTerminate : (evt, gestureState) => this.moveFinished
  //   })
  // },

  componentDidUpdate() {
    if(this.props.open){
      this.moveCenterView(screenWidth * 0.55)
    }else{
      this.moveFinished()
    }
  }
  moveCenterView(left){
    if (!this.center) return

    if ((this.offset + left) < 0) {
      this.left = -this.offset
    } else {
      this.left = left
    }
    this.center.setNativeProps({style:{left: this.offset + this.left}})
  }

  moveFinished(){
    // if (!this.center) return
    //
    // var offset = this.offset + this.left
    // if(this.offset === 0){
    //   if(offset > screenWidth * 0.25){
    //     this.offset = screenWidth * 0.75
    //   }
    // } else {
    //   if( offset < screenWidth * 0.5){
    //     this.offset = 0
    //   }
    // }

    // Animation.startAnimation(this.center, 400, 0, 'easeInOut', {'anchorPoint.x':0, 'position.x':this.offset})
    this.center.setNativeProps({style:{left:0}})
  }
  render(){
    var centerView = this.props.renderCenterView ? this.props.renderCenterView : null
    var leftView = this.props.renderLeftView ? this.props.renderLeftView : null
    this.offset = 0
    return(
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left}>
          {leftView}
        </View>
        <View
          style={[styles.center, {left: this.offset}]}
          ref={(center)=> this.center = center}>
          {centerView}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    backgroundColor: 'blue',
  },
  left: {
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right: 0,
    backgroundColor: '#FFFFFF',
  },
})

var mapStateToProps = (state) =>{
  return {
    open: state.slideMenu.open
  }
}

export default connect(mapStateToProps)(SlideMenu)
