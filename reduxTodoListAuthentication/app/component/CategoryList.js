'use strict'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getQuestionByCategory} from '../actions'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class CategoryList extends Component {
  constructor(props){
    super(props)
    this.state = {
      openComponent: new Animated.Value(0),
      activeColor:'white'
    }
  }
  componentWillReceiveProps(){
    if(!this.props.onDisplay){
      this.state.openComponent.setValue(0);
    }
    Animated.spring(
        this.state.openComponent,
        {
            toValue: 85,
            friction:2.5,
            tension:5
        }
    ).start();
  }
  changeCategory(categorySelected){
    console.log('changeCategory',categorySelected);
    // this.setState({
    //   activeColor:'red'
    // })
    this.props.categorySelected(categorySelected)
    this.props.dispatch(getQuestionByCategory(categorySelected))
  }
  render(){
    let categories = this.props.values.map((value, index) => (
      <View
        style={styles.elementsContainer}
        key={index}
        value={value}>
        <TouchableHighlight onPress={this.changeCategory.bind(this, value.title)} underlayColor='transparent' style={styles.containerText}>
          <Icon name={value.icon} size={40} color={this.state.activeColor}/>
        </TouchableHighlight>
        <Text style={styles.textElements}>{value.title}</Text>
      </View>)
    );
    if(this.props.onDisplay){
      return (
        <Animated.View
          style={[styles.topNavBar, {height:this.state.openComponent}]}>
          <ScrollView
            horizontal={true}>
            {categories}
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

export default connect()(CategoryList)
