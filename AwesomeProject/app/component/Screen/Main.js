import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reduxForm, change} from 'redux-form'
import {unauthUser, getQuestion, getQuestionByCategory, removeAlert, setCategorySelected, selectActiveQuestion, removeActiveQuestion} from '../../actions'

import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  ListView,
  RefreshControl,
  TouchableHighlight
} from 'react-native';

import NavigationTabs from './../common/NavigationTabs'
import SearchNavigation from './../common/SearchNavigation'
import ViewModal from './../ViewModal'
import ViewModalAnswer from './../ViewModalAnswer'
import Question from './../Question'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';
import FloatingBtn from './../common/FloatingBtn'

class Main extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible:false,
      modalAnswerVisible:false,
      dataSource: ds.cloneWithRows(props.questions),
      refreshing:false,
    };
  }

  componentWillReceiveProps (props) {
    if(props.activeQuestion){
      let oldQuestions = props.questions.slice()
      let result = oldQuestions.findIndex(this.findFunction.bind(this, props.activeQuestion))
      oldQuestions[result] = props.activeQuestion
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(oldQuestions)
      })
    }else{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(props.questions)
      })
    }
  }

  findFunction(activeQuestion, element){
    if(element._id == activeQuestion._id){
      return element
    }
  }

  onLogout(){
    this.props.dispatch(unauthUser)
  }

  addNewQuestion(){
    this.setState({modalVisible:true})
  }

  addNewAnswer(){
    this.setState({modalAnswerVisible:true})
  }

  closeModal(){
    this.setState({modalVisible:false})
    this.removeAlerts()
  }

  closeModalAnswer(){
    this.setState({modalAnswerVisible:false})
    this.removeAlerts()
  }

  _onRefresh(){
    this.setState({refreshing:true})
    this.props.dispatch(removeActiveQuestion())
    this.updateQuestions()
  }

  updateQuestions(){
    this.props.dispatch(getQuestion(false)).then(() => {
      this.setState({refreshing:false})
      this.props.dispatch(setCategorySelected([]))
    })
  }

  openQuestion(rowData){
    this.props.dispatch(selectActiveQuestion(rowData, this.props.navigator))

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
    var {fields:{content, category}} = this.props
    return (
      <View style={styles.container}>
        <NavigationTabs/>
        <SearchNavigation/>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert('Modal has been close')}}>
          <ViewModal closeModal={this.closeModal.bind(this)}/>
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalAnswerVisible}
          onRequestClose={() => {alert('Modal has been close')}}>
          <ViewModalAnswer closeModal={this.closeModalAnswer.bind(this)}/>
        </Modal>
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <TouchableHighlight onPress={this.openQuestion.bind(this, rowData)}>
              <View><Question rowData={rowData} openQuestion={this.addNewAnswer.bind(this)} updateModel={this.updateQuestions.bind(this)}/></View>
            </TouchableHighlight>}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>}
                enableEmptySections={true}/>
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
    backgroundColor:'rgb(231,235,238)'
  },
  text:{
    color:'black',
    fontSize:18
  },
  listView:{
    flex: 1,
  },
  addButton:{
    backgroundColor: '#35D0C1',
    borderColor: '#35D0C1',
    borderWidth: 1,
    height: 75,
    width: 75,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  plusBtn:{
    marginTop:5,
    marginLeft:2
  }
});

var mapStateToProps = (state) => {
  return {
    questions:state.questions,
    alerts:state.alert,
    filter:state.filter,
    activeQuestion:state.activeQuestion,
  }
}
//PUEDES PONER UN VALIDATE FUNCTION PARA QUE COMPRUEBE COSAS

// Decorate the form component
Main = reduxForm({
  form: 'addQuestion', // a unique name for this form
  fields:['content','category']
}, null, null)(Main);

export default connect(mapStateToProps)(Main);
