import React, { Component } from 'react';
import {connect} from 'react-redux'
import {reduxForm, change} from 'redux-form'
import {unauthUser, createQuestion, getQuestion, addAlert, removeAlert} from '../actions'
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
import AlertContainer from './alerts/AlertContainer'

const Item = Picker.Item

class ViewModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible:false,
      category:'Elige una categoria',
      displayPicker:false,
      content:''
    };
  }
  removeAlerts(){
    let {dispatch, alerts} = this.props
    alerts.forEach((item, index)=>{
      if(item.text === 'Necesita rellenar ambos campos'){
        dispatch(removeAlert(item.id))
      }
    })
  }
  submitNewQuestion(){
    let {dispatch, user_id} = this.props
    if(this.state.content ==='' || this.state.category === 'Elige una categoria'){
      dispatch(addAlert('Necesita rellenar ambos campos'))
    } else {
      this.props.closeModal()
      dispatch(createQuestion(this.state.content, this.state.category, user_id))
      // Clean the form values
      this.props.dispatch(change('addQuestion', 'content', ''))
      this.props.dispatch(change('addQuestion', 'category', ''))
    }
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
    this.removeAlerts()
  }
  render(){
    let pickerRender
    let pickerSelection
    if(this.state.displayPicker){
      pickerRender = (
        <Picker
          selectedValue={this.state.category}
          onValueChange={this.onPickerChange.bind(this, 'category')}
          itemStyle={styles.pickerText}>
          <Item label='Elige una categoria' category="Elige una categoria" value="Elige una categoria"/>
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
          <Text>{this.state.category}</Text>
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
            placeholder="Pregunta"
            style={styles.textInput}
            multiline={true}
            onChangeText={(newText)=>{this.setState({content:newText})}}
            onSubmitEditing={this.submitNewQuestion.bind(this)}
            onFocus={this.removeAlerts.bind(this)}/>
        </View>
        <View style={styles.submit}>
          <TouchableOpacity onPress={this.submitNewQuestion.bind(this)}>
            <Icon name='ios-add-circle' size={50} color="#35D0C1"/>
          </TouchableOpacity>
        </View>
        <View style={styles.alertContainer}>
          <AlertContainer/>
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
  pickerText:{
    fontSize:17
  },
  pickerDefault:{
    backgroundColor:'red'
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
    height:200,
    fontSize:15
  },
  submit:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer:{
    position:'relative',
    top:Dimensions.get('window').height - 362
  },
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id,
    alerts:state.alert
  }
}

export default connect(mapStateToProps)(ViewModal);
