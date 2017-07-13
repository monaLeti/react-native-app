
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getQuestion, getQuestionByCategory, searchByWord, setCategorySelected} from '../../actions'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryList from '../CategoryList'
class SearchNavigation extends Component {
  constructor(props){
    super(props)
    this.state ={
      searchText:'',
      displayCategory:false
    }
  }
  searchInputSubmmit(){
    this.props.dispatch(searchByWord(this.state.searchText))
    this.setState({searchText:''})
  }
  showTodas(){
    console.log('showTodas', this.props.filter.categorySelected);
    if(this.props.filter.categorySelected.length > 0){
      this.props.dispatch(getQuestionByCategory(this.props.filter.categorySelected, false))
    }else{
      this.props.dispatch(getQuestion(false))
    }

  }
  showPopular(){
    if(this.props.filter.categorySelected.length > 0){
      this.props.dispatch(getQuestionByCategory(this.props.filter.categorySelected, true))
    } else {
      this.props.dispatch(getQuestion(true))
    }
  }
  showPosition(){
    console.log('showPosition');
  }
  showCategory(){
    console.log('showCategory');
    this.setState({
      displayCategory:!this.state.displayCategory
    })
  }
  categorySelected(category){
    console.log('categorySelected', category);
    if(category.length > 0){
      this.props.dispatch(getQuestionByCategory(category, false))
    }else{
      this.props.dispatch(getQuestion(false))
    }
    this.props.dispatch(setCategorySelected(category))
  }
  render(){
    return (
      <View>
        <View style={styles.searchNavigation}>
          <View style={styles.search}>
            <Icon name="magnify" size={25} color='white'/>
            <TextInput style={styles.searchInput}
              onChangeText={(searchText) => this.setState({searchText})}
              value={this.state.searchText}
              onSubmitEditing={this.searchInputSubmmit.bind(this)}/>
          </View>
          <View>
            <TouchableHighlight onPress={this.showTodas.bind(this)} underlayColor='transparent'>
              <Icon name="home" size={25} color='white'/>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={this.showPopular.bind(this)} underlayColor='transparent'>
              <Icon name="heart" size={25} color='white'/>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={this.showPosition.bind(this)} underlayColor='transparent'>
              <Icon name="map-marker-multiple" size={25} color='white'/>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={this.showCategory.bind(this)} underlayColor='transparent'>
              <Icon name="menu" size={25} color='white'/>
            </TouchableHighlight>
          </View>
        </View>
        <CategoryList
          elementSelected = {this.props.filter.categorySelected}
          onDisplay={this.state.displayCategory}
          values={listOfCategories}
          categorySelected={this.categorySelected.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchNavigation:{
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#35D0C1',
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10,
    borderRadius:10,
    marginTop:7,
    marginBottom:7,
    marginLeft:7,
    marginRight:7
  },
  search:{
    flexDirection:'row',
    height:30,
    width:130,
    borderBottomWidth:2,
    borderBottomColor:'white',
  },
  searchInput:{
    width:120,
    height:30,
    color:'white'
  },
})
const listOfCategories = {
  age:[
    {
      title:"Embarazo",
      icon:"human-pregnant",
    },
    {
      title:"0-6 Meses",
      icon:"baby-buggy",
    },
    {
      title:"6-12 Meses",
      icon:"baby",
    },
    {
      title:"1-2 Años",
      icon:"emoticon",
    },
    {
      title:"3-4 Años",
      icon:"emoticon-excited",
    },
    {
      title:"5 Años",
      icon:"human-male-female",
    }],
    action:[
      {
        title:"Lactancia",
        icon:"auto-fix",
      },
      {
        title:'Alimentación',
        icon:'food-apple',
      },
      {
        title:'Sueño',
        icon:'beach',
      },
      {
        title:'Salud',
        icon:'beach',
      },
      {
        title:'Educación',
        icon:'beach',
      },
      {
        title:'Compras',
        icon:'beach',
      },
      {
        title:'Ocio',
        icon:'beach',
      },
      {
        title:'Desarrollo',
        icon:'beach',
      },
      {
        title:'Otros',
        icon:'beach',
      }
    ]
}
var mapStateToProps = (state) => {
  return {
    filter:state.filter,
  }
}

export default connect(mapStateToProps)(SearchNavigation)
