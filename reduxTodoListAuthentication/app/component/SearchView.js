
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getQuestion, getQuestionByCategory, setCategorySelected, setSortSelected} from '../actions'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import CategoryList from './CategoryList'

class SearchView extends Component {
  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      displayCategory:false,
      displayFilter:false,
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
    })
    this.props.dispatch(setCategorySelected(text))
    if(text.indexOf('Todos') === -1){
      this.props.dispatch(getQuestionByCategory(text))
    }else{
      this.props.dispatch(getQuestion)
    }
  }
  filterSelected(text){
    this.setState({
      displayFilter:true,
    })
    this.props.dispatch(setSortSelected(text))
    // if(text.indexOf('Todos') === -1){
    //   this.props.dispatch(getQuestionByCategory(text))
    // }else{
    //   this.props.dispatch(getQuestion)
    // }
  }
  render(){
    return (
      <View>
        <View style={styles.topNavBar}>
          <TouchableHighlight onPress={this.selectCategory.bind(this)} underlayColor='transparent' style={styles.containerText}>
            <Text style={styles.textCategory}>{this.props.filter.categorySelected}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.selectFilter.bind(this)} underlayColor='transparent' style={styles.containerText}>
            <Text style={styles.textCategory}>{this.props.filter.sortSelected}</Text>
          </TouchableHighlight>
        </View>
        <CategoryList
          elementSelected = {this.props.filter.categorySelected}
          onDisplay={this.state.displayCategory}
          values={listOfCategories}
          categorySelected={this.categorySelected.bind(this)}/>
        <CategoryList
          elementSelected = {this.props.filter.sortSelected}
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
    title:"Todos",
    icon:"home-variant"
  },
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
    title:'Alimentación',
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

var mapStateToProps = (state) => {
  return {
    filter:state.filter,
  }
}

export default connect(mapStateToProps)(SearchView)
