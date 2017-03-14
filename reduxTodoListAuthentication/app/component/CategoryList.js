
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class CategoryList extends Component {
  constructor(props){
    super(props)
    this.state = {
      openComponent: new Animated.Value()
    }
  }
  componentWillReceiveProps(){
    this.state.openComponent.setValue(0);
    Animated.spring(
        this.state.openComponent,
        {
            toValue: 100,
            friction:2.5,
            tension:5
        }
    ).start();
  }
  render(){
    if(this.props.onDisplay){
      return (
        <Animated.View style={[styles.topNavBar, {height:this.state.openComponent}]}>
          <ScrollView
            horizontal={true}>
            <View style={styles.elementsContainer}>
              <Icon name='ios-restaurant' size={50} color="white"/>
              <Text style={styles.textElements}>Alimentación</Text>
            </View>
            <View style={styles.elementsContainer}>
              <Icon name='ios-restaurant' size={50} color="white"/>
              <Text style={styles.textElements}>Alimentación</Text>
            </View>
            <View style={styles.elementsContainer}>
              <Icon name='ios-restaurant' size={50} color="white"/>
              <Text style={styles.textElements}>Alimentación</Text>
            </View>
            <View style={styles.elementsContainer}>
              <Icon name='ios-restaurant' size={50} color="white"/>
              <Text style={styles.textElements}>Alimentación</Text>
            </View>
          </ScrollView>
        </Animated.View>
      )
    } else {
      return(<View></View>)
    }
  }
}

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    backgroundColor:'#8f959e',
  },
  elementsContainer:{
    alignItems:'center',
    marginRight:20
  },
  textElements:{
    color:'white'
  }
})

export default CategoryList
