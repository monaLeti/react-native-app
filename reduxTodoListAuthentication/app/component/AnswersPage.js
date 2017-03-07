import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ListView,
  RefreshControl,
  Keyboard
} from 'react-native';

import TopBar from './common/TopBar'
import Question from './Question'
import Icon from 'react-native-vector-icons/Ionicons';

import {createAnswer} from '../actions'

class AnswersPage extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      text:"",
      height: Dimensions.get('window').height - 35,
      dataSource: ds.cloneWithRows(props.activeQuestion.answers),
    }
  }
  componentWillReceiveProps (props) {
    console.log(props.activeQuestion.answers);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.activeQuestion.answers)
    })
  }
  addNewQuestion(){
    this.setState({
      height: Dimensions.get('window').height - 250
    })
  }
  onSubmitComment(){
    console.log(this.props.activeQuestion);
    this.props.dispatch(createAnswer(this.state.text, this.props.user_id, this.props.activeQuestion._id))
    Keyboard.dismiss();
    this.setState({
      height: Dimensions.get('window').height - 35,
      text:''
    })
  }
  backToMain(){
    this.props.navigator.pop()
  }
  render(){
    const {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <TopBar
          leftItem={{
            icon:'ios-arrow-round-back-outline',
            onPress:this.backToMain.bind(this)
          }}/>
        <View style={styles.question}>
          <Question rowData={this.props.activeQuestion} openQuestion={this.addNewQuestion.bind(this)}/>
        </View>
        <View style={styles.listViewAnswers}>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={(rowData) => <Question rowData={rowData} openQuestion={this.addNewQuestion.bind(this)}/>}/>
        </View>
        <View style={[styles.addNewComment, {top:this.state.height}]}>
          <TextInput
            style={styles.inputComment}
            onFocus={this.addNewQuestion.bind(this)}
            onChangeText={(newText)=>{this.setState({text:newText})}}
            onSubmitEditing={this.onSubmitComment.bind(this)}
            value={this.state.text}
            placeholder='Añade un comentario'/>
          <TouchableOpacity onPress={this.onSubmitComment.bind(this)}>
            <Icon name='ios-add-circle' size={30} color="#35D0C1"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:'#EFEFF4'
  },
  question:{
    marginBottom:3
  },
  addNewComment:{
    position:'absolute',
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor:'white',
    paddingLeft:5,
    borderColor: '#e5e6e8',
    borderWidth: 1
  },
  inputComment:{
    flex:1,
    height: 33,
    backgroundColor:'white'
  },
  listViewAnswers:{
    marginBottom:193
  },
});

var mapStateToProps = (state) => {
  return {
    activeQuestion:state.activeQuestion,
    user_id:state.auth.user_id,
  }
}

export default connect(mapStateToProps)(AnswersPage);
