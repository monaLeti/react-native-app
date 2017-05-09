
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {UPDATE_QUESTION} from '../api'

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
      noLikeComment:false,
      numberLikeComment:this.props.rowData.nPositiveVotes || 0,
      numberNoLikeComment:this.props.rowData.nNegativeVotes || 0
    }
  }
  componentWillMount(){
    this.renderUserAction(this.props)
  }
  componentWillReceiveProps (props) {
    this.setState({
      likeComment:false,
      noLikeComment:false,
      numberLikeComment:props.rowData.nPositiveVotes || 0,
      numberNoLikeComment:props.rowData.nNegativeVotes || 0
    })
    this.renderUserAction(props)
  }
  // Function to display if the user has liked/unliked the comment
  renderUserAction(props){
    console.log('renderUserAction',props.rowData);
    let positiveVotesArray = props.rowData.positiveVotes
    let negativeVotes = props.rowData.negativeVotes
    if (positiveVotesArray.indexOf(props.user_id) !== -1) {
      this.setState({
        likeComment:true
      })
    }
    if (negativeVotes.indexOf(this.props.user_id) !== -1) {
      this.setState({
        noLikeComment:true
      })
    }
  }
  showAnswers(){
    this.props.openQuestion()
    this.props.dispatch(selectActiveQuestion(this.props.rowData))
  }

  updateComment(question, reactionObject){
    console.log('updateComment', reactionObject, UPDATE_QUESTION + question);
    axios.put(UPDATE_QUESTION + question, reactionObject)
    .then(response => {
      console.log('AFTER UPDATE_QUESTION',response);
    })
    .catch(err =>{
      console.log('after UPDATE_QUESTION err',err);
    })
  }
// Function called when the user clicks like
  likeComment(questionId){
    let newNumberOfLikes = 0
    let newNumberOfNoLikes = 0
    if(this.state.noLikeComment){
      newNumberOfNoLikes = this.state.numberNoLikeComment - 1
      this.setState({
        noLikeComment:!this.state.noLikeComment,
        numberNoLikeComment: newNumberOfNoLikes
      })
      newNumberOfNoLikes = -1
    }
    if(!this.state.likeComment){
      newNumberOfLikes = this.state.numberLikeComment + 1
      this.setState({
        likeComment: !this.state.likeComment,
        numberLikeComment:newNumberOfLikes
      })
      newNumberOfLikes = 1
    } else {
      this.setState({
        likeComment: !this.state.likeComment,
        numberLikeComment:this.state.numberLikeComment - 1
      })
      newNumberOfLikes = -1
    }
    let reactionObject = {
      nPositiveVotes: newNumberOfLikes,
      nNegativeVotes: newNumberOfNoLikes,
      user:this.props.user_id
    }
    this.updateComment(questionId, reactionObject)
  }
  // Function called when the user clicks unlike
  noLikeComment(questionId){
    let newNumberOfLikes = 0
    let newNumberOfNoLikes = 0
    if(this.state.likeComment){
      newNumberOfLikes = this.state.numberLikeComment - 1
      this.setState({
        likeComment:!this.state.likeComment,
        numberLikeComment: newNumberOfLikes
      })
      newNumberOfLikes = -1
    }
    if(!this.state.noLikeComment){
      newNumberOfNoLikes = this.state.numberNoLikeComment + 1
      this.setState({
        noLikeComment: !this.state.noLikeComment,
        numberNoLikeComment:newNumberOfNoLikes
      })
      newNumberOfNoLikes = 1
    } else {
      this.setState({
        noLikeComment: !this.state.noLikeComment,
        numberNoLikeComment:this.state.numberNoLikeComment - 1
      })
      newNumberOfNoLikes = -1
    }
    let reactionObject = {
      nPositiveVotes: newNumberOfLikes,
      nNegativeVotes: newNumberOfNoLikes,
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
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Icon style={styles.icon} name="person" size={26} color="#35D0C1"/>
        </View>
        <View style={styles.textProfile}>
          <Text style={styles.userName}>{this.props.rowData.user.name} &#183; 21min </Text>
            <Text style={styles.questionText}>{this.props.rowData.content}</Text>
            <Text style={styles.categoryText}>{this.props.rowData.category}</Text>
          <View style={styles.buttonsForReact}>
            <View style={styles.iconLike}>
              <View style={styles.iconLike}>
                <TouchableOpacity onPress={this.likeComment.bind(this, this.props.rowData._id)}>
                  <IconIonic name="ios-heart" size={26} color={this.setLikeIconsColor(this.state.likeComment)}/>
                </TouchableOpacity>
                <Text style={styles.likeText}>{this.state.numberLikeComment}</Text>
              </View>
              <View style={styles.iconLike}>
                <TouchableOpacity onPress={this.noLikeComment.bind(this, this.props.rowData._id)}>
                  <IconComunity name="heart-broken" size={26} color={this.setLikeIconsColor(this.state.noLikeComment)}/>
                </TouchableOpacity>
                <Text style={styles.likeText}>{this.state.numberNoLikeComment}</Text>
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
