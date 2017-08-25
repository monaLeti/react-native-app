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

class ProfileFavourites extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log('props.user_id',props.user_id._id);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing:false,
    };

  }
  componentDidMount() {
    axios.get(GET_QUESTION_BY_USER + this.props.user_id._id)
    .then(response => {
      console.log('response',response.data.questions);
      if(response.data.questions){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.data.questions)
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
    console.log('profile favourte',this.state.dataSource);
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
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id,
    questions:state.questions,
  }
}

export default connect(mapStateToProps)(ProfileFavourites)
