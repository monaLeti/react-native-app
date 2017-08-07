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
  Modal,
} from 'react-native';

import TopBar from './../common/TopBar'
import Question from './../Question'
import FloatingBtn from './../common/FloatingBtn'
import ViewModal from './../ViewModalAnswer'
import Icon from 'react-native-vector-icons/Ionicons';

import {createAnswer, removeAlert} from '../../actions'

class AnswersPage extends Component{
  constructor(props){
    console.log('constructor answer',props);
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible:false,
      dataSource: ds.cloneWithRows(props.activeQuestion.answers),
    }
  }
  componentWillReceiveProps (props) {
    console.log('componentWillReceiveProps answer',props);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.activeQuestion.answers),
    })
  }
  onSubmitComment(){
    console.log('onSubmitComment');
    // this.props.dispatch(createAnswer(this.state.text, this.props.user_id, this.props.activeQuestion._id))
  }
  backToMain(){
    this.props.navigator.pop()
  }
  addNewQuestion(){
    this.setState({modalVisible:true})
  }

  closeModal(){
    this.setState({modalVisible:false})
    this.removeAlerts()
  }

  removeAlerts(){
    let {dispatch, alerts} = this.props
    alerts.forEach((item, index)=>{
      if(item.text === 'Necesita rellenar ambos campos'){
        dispatch(removeAlert(item.id))
      }
    })
  }

  render(){
    console.log('render answer', this.props.activeQuestion);
    const {height, width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <TopBar
          leftItem={{
            icon:'ios-arrow-round-back-outline',
            onPress:this.backToMain.bind(this)
          }}/>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert('Modal has been close')}}>
            <ViewModal closeModal={this.closeModal.bind(this)} Model='Answer'/>
          </Modal>
          <View style={styles.question}>
            <Question rowData={this.props.activeQuestion} openQuestion={this.addNewQuestion.bind(this)}/>
          </View>
          <View style={styles.listViewAnswers}>
            <ListView
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={(rowData) => <Question rowData={rowData}/>}/>
          </View>
        <FloatingBtn onPress={this.addNewQuestion.bind(this)}/>
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
    fontSize:15,
    backgroundColor:'white'
  },
  listViewAnswers:{
    flex: 1,
  },
});

var mapStateToProps = (state) => {
  return {
    activeQuestion:state.activeQuestion,
    user_id:state.auth.user_id,
    alerts:state.alert,
  }
}

export default connect(mapStateToProps)(AnswersPage);
