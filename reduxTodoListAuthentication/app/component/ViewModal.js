import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reduxForm, change} from 'redux-form'
import {unauthUser, createQuestion, getQuestion} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Item = Picker.Item

class ViewModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible:false,
      category:'Embarazo',
      displayPicker:false
    };
  }

  submitNewQuestion(){
    console.log('submitNewQuestion');
    var {dispatch, user_id, fields:{content, category}} = this.props
    this.props.closeModal()

    dispatch(createQuestion(content, category, user_id))
    // Clean the form values
    this.props.dispatch(change('addQuestion', 'content', ''))
    this.props.dispatch(change('addQuestion', 'category', ''))
  }
  onPickerChange(key: string, value: string){
    const newState = {}
    newState[key] = value
    newState['displayPicker'] = !this.state.displayPicker
    this.setState(newState)
  }
  showPicker(){
    this.setState({
      displayPicker: !this.state.displayPicker
    })
  }
  render(){
    var {fields:{content, category}} = this.props
    let pickerRender
    let pickerSelection
    if(this.state.displayPicker){
      pickerRender = (
        <Picker
          style={styles.picker}
          selectedValue={this.state.category}
          onValueChange={this.onPickerChange.bind(this, 'category')}
          itemStyle={styles.pickerText}>
          <Item label='Embarazo' category="Embarazo" value="Embarazo"/>
          <Item label='Bebes' category="Bebes" value="Bebes"/>
          <Item label='Ocio' category="Ocio" value="Ocio"/>
          <Item label='Alimentación' category="Alimentación" value="Alimentación"/>
          <Item label='Animales' category="Animales" value="Animales"/>
          <Item label='Juegos' category="Juegos" value="Juegos"/>
        </Picker>
      )
    } else {
      pickerSelection = (
        <TouchableOpacity style={styles.field} onPress={this.showPicker.bind(this)}>
          <Text {...category}>{this.state.category}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View>
        <View style={styles.topBarModal}>
          <TouchableOpacity onPress={this.props.closeModal}>
            <Icon name='ios-arrow-round-back' size={30} color="white"/>
          </TouchableOpacity>
          <Text style={styles.textTop}>
            Añade nueva pregunta
          </Text>
        </View>
        <View>
          {pickerSelection}
          {pickerRender}
        </View>
        <View style={styles.fieldQuestion}>
          <TextInput
            {...content}
            placeholder="Pregunta"
            style={styles.textInput}
            multiline={true}/>
        </View>
        <View style={styles.submit}>
          <TouchableOpacity onPress={this.submitNewQuestion.bind(this)}>
            <Icon name='ios-add-circle' size={50} color="#35D0C1"/>
          </TouchableOpacity>
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
  topBarModal:{
    flexDirection:'row',
    backgroundColor:"#35D0C1",
    height:50,
    paddingTop:15,
    paddingLeft:15
  },
  textTop:{
    color:'white',
    fontSize:17,
    marginLeft:20,
    paddingTop:5
  },
  picker:{
    width:Dimensions.get('window').width,
  },
  pickerText:{
    fontSize:17
  },
  field: {
    borderRadius: 5,
    padding:5,
    paddingLeft:8,
    margin:7,
    borderWidth:1,
    borderColor:'#D3D3D3',
  },
  fieldQuestion:{
    height:200,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#D3D3D3',
    padding:5,
    paddingLeft:8,
    margin:7,
  },
  textInput: {
    height:26
  },
  submit:{
    justifyContent: 'center',
    alignItems: 'center',
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
  fields:['content','category']
}, null, null)(ViewModal);

export default connect(mapStateToProps)(ViewModal);
