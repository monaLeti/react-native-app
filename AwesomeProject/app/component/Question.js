
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment'
import moment_precise_range from 'moment-precise-range'
import esLocale from 'moment/locale/es'


import {UPDATE_MODEL, UPDATE_FAVOURITE_MODE, UPDATE_FAVOURITE_ANSWER_MODE} from '../api'

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
    let obj = {
      likeComment:false,
      favouritesComment:false,
      numberLikeComment:this.props.rowData.likes.length || 0,
      numberFavouritesComment:this.props.rowData.favorites.length || 0,
      numberAnswers:0,
      userName:this.props.rowData.user || '',
      timePass:'',
      category:this.props.rowData.category.join(),
    }
    if(this.props.rowData.answers){
      obj.numberAnswers = this.props.rowData.answers.length
    }
    this.state = obj
  }
  componentWillMount(){
    this.renderUserAction(this.props)
  }

  componentWillReceiveProps (props) {
    console.log('componentWillReceiveProps',props);
    let obj = {
      likeComment:false,
      favouritesComment:false,
      numberLikeComment:props.rowData.likes.length || 0,
      numberFavouritesComment:props.rowData.favorites.length || 0,
      userName:props.rowData.user || '',
      category:props.rowData.category.join(),
    }
    if(props.rowData.answers){
      obj.numberAnswers = props.rowData.answers.length
    }
    this.setState(obj)
    this.renderUserAction(props)
  }

  // Function to display if the user has liked/unliked the comment and has select the question has favourite
  renderUserAction(props){
    this.calculateTimePassed(props)
    let positiveVotesArray = props.rowData.likes
    let favouritesArray = props.rowData.favorites
    if (positiveVotesArray.indexOf(props.user_id) !== -1) {
      this.setState({
        likeComment:true
      })
    }
    if (favouritesArray.indexOf(props.user_id) !== -1) {
      this.setState({
        favouritesComment:true
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

  updateFavouriteComment(question, reactionObject){
    console.log('updateFavouriteComment',question);
    let api = UPDATE_FAVOURITE_MODE
    if(!question.answers){
      api = UPDATE_FAVOURITE_ANSWER_MODE
    }
    axios.put(api + question._id, reactionObject)
    .then(response => {
      console.log('response',response);
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

  // Function called when the user clicks favourite
  favouriteComment(questionId){
    let newNumberOfFavourites = 0
    let favourite = 0
    if(this.state.favouritesComment){
      newNumberOfFavourites = this.state.numberFavouritesComment - 1
      favourite = -1
    } else {
      newNumberOfFavourites = this.state.numberFavouritesComment + 1
      favourite = 1
    }
    this.setState({
      favouritesComment: !this.state.favouritesComment,
      numberFavouritesComment:newNumberOfFavourites
    })
    let reactionObject = {
      favourite: favourite,
      user:this.props.user_id
    }
    this.updateFavouriteComment(questionId, reactionObject)
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
    var commentBtnInfo = () =>{
      if(this.props.rowData.answers){
        return <View style={styles.iconLike}><Icon name="note" size={20} color="#d6f5f2"/><Text style={styles.likeText}>{this.state.numberAnswers}</Text></View>
      }
      else{
        return <View></View>
      }
    }
    var commentBtn = () =>{
      if(this.props.rowData.answers){
        return <View><TouchableOpacity onPress={this.showAnswers.bind(this)}>
          <Icon name="note" size={26} color="#35D0C1"/>
        </TouchableOpacity></View>
      }
      else{
        return <View></View>
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Icon style={styles.icon} name="person" size={26} color="#35D0C1"/>
        </View>
        <View style={styles.textProfile}>
          <Text style={styles.userName}>{this.state.userName.name} &#183; {this.state.timePass} </Text>
            <Text style={styles.questionText}>{this.props.rowData.content}</Text>
            <Text style={styles.categoryText}>{this.state.category}</Text>
          <View style={styles.buttonsForReact}>
            <View style={styles.iconLike}>
              <View style={styles.iconLike}>
                <IconIonic name="ios-heart" size={20} color='#d6f5f2'/>
                <Text style={styles.likeText}>{this.state.numberLikeComment}</Text>
              </View>
              {commentBtnInfo()}
            </View>
            <View style={styles.iconLike}>
              <View style={styles.iconLike}>
                <TouchableOpacity onPress={this.likeComment.bind(this, this.props.rowData._id)}>
                  <IconIonic name="ios-heart" size={26} color={this.setLikeIconsColor(this.state.likeComment)}/>
                </TouchableOpacity>
              </View>
              <View style={styles.iconLike}>
                <TouchableOpacity onPress={this.favouriteComment.bind(this, this.props.rowData)}>
                  <IconIonic name="ios-star" size={26} color={this.setLikeIconsColor(this.state.favouritesComment)}/>
                </TouchableOpacity>
              </View>
              {commentBtn()}
            </View>
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
