import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser, selectActiveQuestion} from '../../actions'

import axios from 'axios';
import {GET_QUESTION_BY_USER} from '../../api'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';


import Question from './../Question'

class ProfileMyMessages extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing:false,
    };

  }
  
  componentDidMount() {
    axios.get(GET_QUESTION_BY_USER + this.props.user_id._id)
    .then(response => {
      let questionsArray = response.data.user.questions
      let answerArray = response.data.user.answers
      let myMessages = questionsArray.concat(answerArray)
      if(myMessages){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(myMessages)
        })
      }
    })
    .catch(err =>{
      console.log('after GET_QUESTION_BY_USER err',err);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([])
      })
    })
   }
  openQuestion(rowData){
    this.props.dispatch(selectActiveQuestion(rowData, this.props.navigator))
    console.log('openQuestion');
  }
  render(){
    console.log('profile message',this.state.dataSource);
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <TouchableHighlight onPress={this.openQuestion.bind(this, rowData)}>
            <View><Question rowData={rowData}/></View>
          </TouchableHighlight>}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:'white',
    paddingTop:10
  },
  containerQuestion:{
    backgroundColor:'red'
  }
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id,
    questions:state.questions,
  }
}

export default connect(mapStateToProps)(ProfileMyMessages)
