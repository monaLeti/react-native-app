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
      value:this.props.values.age,
      valueAction:this.props.values.action,
      numRow : this.calculateTable(this.props.values.age.length),
      numRowAction:this.calculateTable(this.props.values.action.length)
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      elementSelected:props.elementSelected
    })
    if(!this.props.onDisplay){
      this.state.openComponent.setValue(0);
    }
    Animated.spring(
        this.state.openComponent,
        {
            toValue: 190,
            friction:2.5,
            tension:5
        }
    ).start();
  }
  calculateTable(number){
    var totalElement = number
    var numRow = totalElement / 3
    return Math.ceil(numRow)
  }
  colorChange(value){
    if(this.state.elementSelected.length > 0){
      if(this.state.elementSelected.indexOf(value.title)!=-1){
        return '#35D0C1'
      } else {
        return 'white'
      }
    }else{
      return 'white'
    }
  }
  changeCategory(categorySelected){
    let index = this.state.elementSelected.indexOf(categorySelected)
    if( index != -1){
      this.state.elementSelected.splice(index,1)
    }else{
      this.state.elementSelected.push(categorySelected)
    }
    this.setState({
      elementSelected:this.state.elementSelected
    })
    this.props.categorySelected(this.state.elementSelected)
  }
  render(){
    var ageView = []
    var value = this.state.value
    for(let i = 0; i < this.state.numRow; i++){
      var icons = []
      for(let j = 3 * i; j < (3*(i+1)) && j < value.length; j++){
        icons.push(
          <View value={value[j]} key={j} style={styles.elementsContainer}>
            <TouchableHighlight key={j} onPress={this.changeCategory.bind(this, value[j].title)} underlayColor='transparent' style={styles.containerText}>
              <Icon name={value[j].icon} size={30} color={this.colorChange(value[j])}/>
            </TouchableHighlight>
            <Text style={[styles.iconText, {color:this.colorChange(value[j])}]}>{value[j].title}</Text>
          </View>
        )
      }
      ageView.push(<View key={i}>{icons}</View>)
    }
    var valueAnimation = this.state.valueAction
    var actionView = []
    for(let i = 0; i < this.state.numRowAction; i++){
      var iconsAction = []
      for(let j = 3 * i; j < (3*(i+1)) && j < valueAnimation.length; j++){
        iconsAction.push(
          <View value={valueAnimation[j]} key={j} style={styles.elementsContainer}>
            <TouchableHighlight key={j} onPress={this.changeCategory.bind(this, valueAnimation[j].title)} underlayColor='transparent' style={styles.containerText}>
              <Icon name={valueAnimation[j].icon} size={30} color={this.colorChange(valueAnimation[j])}/>
            </TouchableHighlight>
            <Text style={[styles.iconText, {color:this.colorChange(valueAnimation[j])}]}>{valueAnimation[j].title}</Text>
          </View>
        )
      }
      actionView.push(<View key={i}>{iconsAction}</View>)
    }
    if(this.props.onDisplay){
      return (
        <Animated.View
          style={[styles.topNavBar, {height:this.state.openComponent}]}>
          <View style={styles.topNavBar}>
            {ageView}
            {actionView}
          </View>
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
  iconText:{
    fontSize:12
  },
  categoryTable:{
    flexDirection: 'row',
  },
  functionality:{},
})


export default CategoryList
