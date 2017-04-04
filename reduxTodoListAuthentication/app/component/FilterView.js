
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import CategoryList from './CategoryList'

class FilterView extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayCategory:false,
      categoryTitle:'Todos',
      displayFilter:false,
      filterTitle:'Reciente'
    };
  }
  selectCategory(){
    this.setState({
       displayCategory : !this.state.displayCategory,
       displayFilter: false
    });
  }
  selectFilter(){
    this.setState({
      displayCategory: false,
      displayFilter: !this.state.displayFilter
    })
  }
  categorySelected(text){
    this.setState({
      displayCategory:true,
      categoryTitle: text,
    })
  }
  filterSelected(text){
    this.setState({
      displayFilter:true,
      filterTitle: text,
    })
  }
  render(){
    return (
      <View>
        <View style={styles.topNavBar}>
          <TouchableHighlight onPress={this.selectCategory.bind(this)} underlayColor='transparent' style={styles.containerText}>
            <Text style={styles.textCategory}>{this.state.categoryTitle}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.selectFilter.bind(this)} underlayColor='transparent' style={styles.containerText}>
            <Text style={styles.textCategory}>{this.state.filterTitle}</Text>
          </TouchableHighlight>
        </View>
        <CategoryList
          onDisplay={this.state.displayCategory}
          values={listOfCategories}
          categorySelected={this.categorySelected.bind(this)}/>
        <CategoryList
          onDisplay={this.state.displayFilter}
          values={listOfFilter}
          categorySelected={this.filterSelected.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    backgroundColor: '#35D0C1',
  },
  containerText:{
    borderWidth:1,
    borderColor:'white',
    borderRadius:10,
    padding:5,
    marginRight:5
  },
  textCategory:{
    color:'white'
  },
})

const listOfCategories =[
  {
    title:"Embarazo",
    icon:"human-pregnant"
  },
  {
    title:"Bebes",
    icon:"baby-buggy"
  },
  {
    title:'Ocio',
    icon:'beach'
  },
  {
    title:'Alimentacion',
    icon:'food-apple'
  },
  {
    title:'Animales',
    icon:"paw"
  },
  {
    title:'Juegos',
    icon:'puzzle'
  }
]
const listOfFilter =[
  {
    title:"Popular",
    icon:"human-pregnant"
  },
  {
    title:"Recientes",
    icon:"baby-buggy"
  }
]
export default FilterView
