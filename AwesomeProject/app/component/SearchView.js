
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getQuestion, getQuestionByCategory, setCategorySelected, setSortSelected, getQuestionByLocation} from '../actions'

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
  getFilterQuestions(category, sort){
    if(this.props.filter.categorySelected.indexOf('Proximidad') !== -1){
      this.props.dispatch(getQuestionByLocation(category))
    }else if(category.indexOf('Todos') === -1){
      this.props.dispatch(getQuestionByCategory(category, sort))
    }else{
      this.props.dispatch(getQuestion(sort))
    }
  }
  categorySelected(text){
    let fileterByPopularity = false
    if(this.props.filter.sortSelected.indexOf('Popular') !== -1){
      fileterByPopularity = true
    }
    this.setState({
      displayCategory:true,
    })
    this.props.dispatch(setCategorySelected(text))
    this.getFilterQuestions(text, fileterByPopularity)

  }
  filterSelected(text){
    let fileterByPopularity = false
    if(text.indexOf('Popular') !== -1){
      fileterByPopularity = true
    }
    this.setState({
      displayFilter:true,
    })
    this.props.dispatch(setSortSelected(text))
    this.getFilterQuestions(this.props.filter.categorySelected, fileterByPopularity)
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
    icon:"heart"
  },
  {
    title:"Recientes",
    icon:"alarm"
  },
  {
    title:"Proximidad",
    icon:"map-marker-multiple"
  }
]

var mapStateToProps = (state) => {
  return {
    filter:state.filter,
  }
}

export default connect(mapStateToProps)(SearchView)
