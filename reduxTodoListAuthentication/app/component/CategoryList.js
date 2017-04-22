'use strict'
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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class CategoryList extends Component {
  constructor(props){
    super(props)
    this.state = {
      openComponent: new Animated.Value(0),
      elementSelected:this.props.elementSelected,
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
  colorIconChange(value){
    if (value.title === this.state.elementSelected) {
      return '#35D0C1'
    }else{
      return 'white'
    }
  }
  colorTextChange(value){
    if (value.title === this.state.elementSelected) {
      return {color:'#35D0C1'}
    }else{
      return {color:'white'}
    }
  }
  changeCategory(categorySelected){
    this.setState({
      elementSelected:categorySelected
    })
    this.props.categorySelected(categorySelected)
  }
  colorChange(value){
    return this.state.activeColor
  }
  render(){
    let categories = this.props.values.map((value, index) => (
      <View
        style={styles.elementsContainer}
        key={index}
        value={value}>
        <TouchableHighlight onPress={this.changeCategory.bind(this, value.title)} underlayColor='transparent' style={styles.containerText}>
          <Icon name={value.icon} size={40} color={this.colorIconChange(value)}/>
        </TouchableHighlight>
        <Text style={this.colorTextChange(value)}>{value.title}</Text>
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
})


export default CategoryList
