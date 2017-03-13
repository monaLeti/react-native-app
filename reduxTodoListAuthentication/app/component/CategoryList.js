
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class CategoryList extends Component {
  constructor(props){
    super(props)
  }
  render(){
    if(this.props.onDisplay){
      return (
        <View style={styles.topNavBar}>
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
        </View>
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
    backgroundColor:'#8f959e'
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
