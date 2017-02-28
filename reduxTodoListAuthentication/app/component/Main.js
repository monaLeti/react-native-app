import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reduxForm, change} from 'redux-form'
import {unauthUser, createQuestion, getQuestion} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Modal,
  TextInput,
  ListView,
  RefreshControl
} from 'react-native';

import TopBar from './common/TopBar'
import ViewModal from './ViewModal'
import Question from './Question'

class Main extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible:false,
      dataSource: ds.cloneWithRows(props.questions),
      refreshing:false,
    };
  }
  componentWillReceiveProps (props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.questions)
    })

  }
  onLogout(){
    this.props.dispatch(unauthUser)
  }

  addNewQuestion(){
    this.setState({modalVisible:true})
  }

  closeModal(){
    this.setState({modalVisible:false})
  }
  _onRefresh(){
    this.setState({refreshing:true})
    this.props.dispatch(getQuestion).then(() => {
      this.setState({refreshing:false})
    })
  }
  openQuestion(){
    console.log('openQuestion');
    this.props.navigator.push({id:'AnswersPage'})
  }
  render(){
    var {fields:{content, category}} = this.props
    console.log(this.props);
    return (
      <View style={styles.container}>
      <TopBar
        leftItem={{
          icon:'ios-add-circle-outline',
          onPress:this.addNewQuestion.bind(this)
        }}/>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert('Modal has been close')}}>
          <ViewModal closeModal={this.closeModal.bind(this)}/>
        </Modal>
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Question rowData={rowData} openQuestion={this.openQuestion.bind(this)}/>}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>}
                enableEmptySections={true}/>
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
  text:{
    color:'black',
    fontSize:18
  },
  listView:{
    flex: 1,
  },
});

var mapStateToProps = (state) => {
  console.log('mapStateToProps', state);
  return {
    questions:state.questions
  }
}
//PUEDES PONER UN VALIDATE FUNCTION PARA QUE COMPRUEBE COSAS

// Decorate the form component
Main = reduxForm({
  form: 'addQuestion', // a unique name for this form
  fields:['content','category']
}, null, null)(Main);

export default connect(mapStateToProps)(Main);
