
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class FilterView extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.topNavBar}>
        <TouchableHighlight onPress={this.props.onCategoryPress} underlayColor='transparent' style={styles.containerText}>
          <Text style={styles.textCategory}>Todos</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.containerText}>
          <Text style={styles.textCategory}>Todos</Text>
        </TouchableHighlight>
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

export default FilterView
