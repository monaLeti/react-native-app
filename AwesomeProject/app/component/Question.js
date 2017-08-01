
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment'
import moment_precise_range from 'moment-precise-range'
import esLocale from 'moment/locale/es'


import {UPDATE_MODEL} from '../api'

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
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {selectActiveQuestion} from '../actions'

class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      likeComment:false,
      numberLikeComment:this.props.rowData.likes.length || 0,
      userName:this.props.rowData.user || '',
      timePass:'',
      category:this.props.rowData.category.join(),
    }
  }
  componentWillMount(){
    this.renderUserAction(this.props)
  }

  componentWillReceiveProps (props) {
    this.setState({
      likeComment:false,
      numberLikeComment:props.rowData.likes.length || 0,
      category:props.rowData.category.join(),
    })
    this.renderUserAction(props)
  }

  // Function to display if the user has liked/unliked the comment
  renderUserAction(props){
    this.calculateTimePassed(props)
    let positiveVotesArray = props.rowData.likes
    if (positiveVotesArray.indexOf(props.user_id) !== -1) {
      this.setState({
        likeComment:true
      })
    }
  }

  showAnswers(){
    this.props.openQuestion()
    this.props.dispatch(selectActiveQuestion(this.props.rowData))
  }

  updateComment(question, reactionObject){
    axios.put(UPDATE_MODEL + question, reactionObject)
    .then(response => {
      if (this.props.updateModel) {
        this.props.updateModel()
      }
    })
    .catch(err =>{
      console.log('after UPDATE_MODEL err',err);
    })
  }

// Function called when the user clicks like
  likeComment(questionId){

    let newNumberOfLikes = 0
    let like = 0
    if(this.state.likeComment){
      newNumberOfLikes = this.state.numberLikeComment - 1
      like = -1
    } else {
      newNumberOfLikes = this.state.numberLikeComment + 1
      like = 1
    }
    this.setState({
      likeComment: !this.state.likeComment,
      numberLikeComment:newNumberOfLikes
    })
    let reactionObject = {
      like: like,
      user:this.props.user_id
    }
    this.updateComment(questionId, reactionObject)
  }
  // Function to display if the user has clicked in the icon
  setLikeIconsColor(activateIcon){
    if(activateIcon){
      return '#35D0C1'
    }else{
      return '#d6f5f2'
    }
  }
  //Calculate the time that has passed since the question was created
  calculateTimePassed(props){
    moment.locale('es', esLocale)
    var diff = moment.duration(moment().diff(props.rowData.date)).humanize();
    this.setState({
      timePass: diff
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Icon style={styles.icon} name="person" size={26} color="#35D0C1"/>
        </View>
        <View style={styles.textProfile}>
          <Text style={styles.userName}> {this.state.userName.name} &#183; {this.state.timePass} </Text>
            <Text style={styles.questionText}>{this.props.rowData.content}</Text>
            <Text style={styles.categoryText}>{this.state.category}</Text>
          <View style={styles.buttonsForReact}>
            <View style={styles.iconLike}>
              <View style={styles.iconLike}>
                <TouchableOpacity onPress={this.likeComment.bind(this, this.props.rowData._id)}>
                  <IconIonic name="ios-heart" size={26} color={this.setLikeIconsColor(this.state.likeComment)}/>
                </TouchableOpacity>
                <Text style={styles.likeText}>{this.state.numberLikeComment}</Text>
              </View>
            </View>
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
  iconLike:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:12
  },
  likeText:{
    fontSize:11,
    color:"#A4A4A4",
    marginLeft:3
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

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id
  }
}

export default connect(mapStateToProps)(Question);
