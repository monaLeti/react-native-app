import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reduxForm, change} from 'redux-form'
import {unauthUser, createQuestion, getQuestion} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

class ViewModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible:false
    };
  }

  submitNewQuestion(){
    console.log('submitNewQuestion');
    var {dispatch, user_id, fields:{title, category}} = this.props
    this.props.closeModal()

    dispatch(createQuestion(title, category, user_id))
    // Clean the form values
    this.props.dispatch(change('addQuestion', 'title', ''))
    this.props.dispatch(change('addQuestion', 'category', ''))
  }

  render(){
    var {fields:{title, category}} = this.props
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.text}>
          Añade nueva pregunta
        </Text>
        <View style={styles.field}>
          <TextInput
            {...title}
            placeholder="Pregunta"
            style={styles.textInput}/>
        </View>
        <View style={styles.field}>
          <TextInput
            {...category}
            placeholder="Categoria"
            style={styles.textInput}/>
        </View>
        <View>
          <TouchableHighlight onPress={this.submitNewQuestion.bind(this)} underlayColor='transparent'>
            <Text>Validar</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.props.closeModal} underlayColor='transparent'>
            <Text>Cancelar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    color:'black',
    fontSize:18
  },
  modalContainer:{
    marginTop:30,
    height:300,
    backgroundColor:"rgba(245,252,221,0.3)"
  },
  field: {
    borderRadius: 5,
    padding:5,
    paddingLeft:8,
    margin:7,
    backgroundColor:'white'
  },
  textInput: {
    height:26
  },
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id
  }
}
//PUEDES PONER UN VALIDATE FUNCTION PARA QUE COMPRUEBE COSAS

// Decorate the form component
ViewModal = reduxForm({
  form: 'addQuestion', // a unique name for this form
  fields:['title','category']
}, null, null)(ViewModal);

export default connect(mapStateToProps)(ViewModal);
