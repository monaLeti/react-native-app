// ios-paper
// fa-pencil-square-o font-awesome
import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconFontawesome from 'react-native-vector-icons/FontAwesome';

import {selectActiveQuestion} from '../actions'

class Question extends Component {
  showAnswers(){
    this.props.openQuestion()
    this.props.dispatch(selectActiveQuestion(this.props.rowData))
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Icon style={styles.icon} name="person" size={26} color="#35D0C1"/>
        </View>
        <View style={styles.textProfile}>
          <Text style={styles.userName}>Mom &#183; 21min </Text>
          <Text style={styles.questionText}>{this.props.rowData.title}</Text>
          <Text style={styles.categoryText}>{this.props.rowData.category}</Text>
          <View style={styles.buttonsForReact}>
            <TouchableOpacity>
              <IconIonic name="ios-heart" size={26} color="#35D0C1"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showAnswers.bind(this)}>
              <Icon name="note" size={26} color="#35D0C1"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.moreIcon}>
          <TouchableHighlight>
            <IconIonic name="md-more" size={27} color="#35D0C1"/>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft:5,
    paddingTop: 10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#e5e6e8'
  },
  textProfile:{
    flex:1,
    flexDirection: 'column',
  },
  iconView:{
    marginRight:10
  },
  icon:{
    padding:4,
    paddingLeft:13,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#e5e6e8'
  },
  userName:{
    color:"#292f33",
    fontWeight: 'bold'
  },
  questionText:{
    color:"#292f33",
    marginRight:10,
  },
  categoryText:{
    color:"#A4A4A4"
  },
  buttonsForReact:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:5
  },
  moreIcon:{
    marginRight:10,
  }
})

export default connect()(Question)
