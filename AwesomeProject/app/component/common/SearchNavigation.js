
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getQuestion, searchByWord} from '../../actions'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class SearchNavigation extends Component {
  constructor(props){
    super(props)
    this.state ={
      searchText:''
    }
  }
  searchInputSubmmit(){
    this.props.dispatch(searchByWord(this.state.searchText))
    this.setState({searchText:''})
  }
  showTodas(){
    this.props.dispatch(getQuestion(false))
  }
  showPopular(){
    this.props.dispatch(getQuestion(true))
  }
  showPosition(){
    console.log('showPosition');
  }
  showCategory(){
    console.log('showCategory');
  }
  render(){
    return (
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
export default connect()(SearchNavigation);
