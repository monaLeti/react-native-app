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
  RefreshControl
} from 'react-native';

import TopBar from './common/TopBar'
import Question from './Question'
import Icon from 'react-native-vector-icons/Ionicons';

class AnswersPage extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      text:"",
      height: Dimensions.get('window').height - 35,
      dataSource: ds.cloneWithRows(props.questions),
    }
  }
  componentWillReceiveProps (props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.questions)
    })
  }
  addNewQuestion(){
    this.setState({
      height: Dimensions.get('window').height - 250
    })
  }
  onSubmitComment(){
    this.setState({
      height: Dimensions.get('window').height - 35
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
        <Question rowData={this.props.activeQuestion} openQuestion={this.addNewQuestion.bind(this)}/>
        <View style={styles.listViewAnswers}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Question rowData={rowData} openQuestion={this.addNewQuestion.bind(this)}/>}/>
        </View>
        <View style={[styles.addNewComment, {top:this.state.height}]}>
          <TextInput
            style={styles.inputComment}
            onFocus={this.addNewQuestion.bind(this)}
            onSubmitEditing={this.onSubmitComment.bind(this)}
            value={this.state.text}
            placeholder='Añade un comentario'/>
          <TouchableOpacity>
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
    backgroundColor:'white'
  },
  addNewComment:{
    position:'absolute',
    flexDirection:'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1
  },
  inputComment:{
    flex:1,
    height: 33,
    backgroundColor:'white'
  },
  listViewAnswers:{
    marginBottom:133
  },
});

var mapStateToProps = (state) => {
  return {
    activeQuestion:state.activeQuestion,
    questions:state.questions
  }
}

export default connect(mapStateToProps)(AnswersPage);
