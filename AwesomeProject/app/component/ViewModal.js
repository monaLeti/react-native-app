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
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AlertContainer from './alerts/AlertContainer'
import CategoryList from './CategoryList'

const maxNumberOfCharacters = 200
class ViewModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible:false,
      category:[],
      content:'',
      maxCharacters:maxNumberOfCharacters,
      displayCategory:false
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
    if(this.state.content ==='' || this.state.category.length === 0){
      dispatch(addAlert('Necesita rellenar ambos campos'))
    } else {
      this.props.closeModal()
      dispatch(createQuestion(this.state.content, this.state.category, user_id))
      // Clean the form values
      // this.props.dispatch(change('addQuestion', 'content', ''))
      // this.props.dispatch(change('addQuestion', 'category', ''))
    }
  }

  textInputChange(newText){
    let numberOfCharacteres = maxNumberOfCharacters - newText.length
    if (numberOfCharacteres >= 0) {
      this.setState({
        content:newText,
        maxCharacters:numberOfCharacteres
      })
    }
  }
  changeCharacterColor(character){
    if(character < 50){
      return{
        color:'#FF9999'
      }
    } else{
      return {
        color:'#C4C4C4'
      }
    }
  }
  showCategory(){
    this.setState({
      displayCategory:!this.state.displayCategory
    })
  }
  categorySelected(category){
    console.log('categorySelected',category)
  }
  render(){
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
          <TouchableOpacity style={styles.selectCategory} onPress={this.showCategory.bind(this)}>
            <Text>Selecciona al menos una categoria</Text>
          </TouchableOpacity>
        </View>
        <CategoryList
          elementSelected = {this.state.category}
          onDisplay={this.state.displayCategory}
          values={listOfCategories}
          categorySelected={this.categorySelected}/>
        <View style={styles.fieldQuestion}>
          <TextInput
            placeholder="Pregunta"
            style={styles.textInput}
            multiline={true}
            onChangeText={this.textInputChange.bind(this)}
            value={this.state.content}
            onSubmitEditing={this.submitNewQuestion.bind(this)}
            onFocus={this.removeAlerts.bind(this)}/>
          <Text style={[styles.maxCharacters, this.changeCharacterColor(this.state.maxCharacters)]}>{this.state.maxCharacters}</Text>
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
  selectCategory:{
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#D3D3D3',
    padding:5,
    paddingLeft:8,
    margin:7,
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
    height:170,
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
  maxCharacters:{
    width:30,
    left:Dimensions.get('window').width - 60
  },
});

const listOfCategories = {
  age:[
    {
      title:"Embarazo",
      icon:"human-pregnant",
    },
    {
      title:"0-6 Meses",
      icon:"baby-buggy",
    },
    {
      title:"6-12 Meses",
      icon:"baby",
    },
    {
      title:"1-2 Años",
      icon:"emoticon",
    },
    {
      title:"3-4 Años",
      icon:"emoticon-excited",
    },
    {
      title:"5 Años",
      icon:"human-male-female",
    }],
    action:[
      {
        title:"Lactancia",
        icon:"auto-fix",
      },
      {
        title:'Alimentación',
        icon:'food-apple',
      },
      {
        title:'Sueño',
        icon:'beach',
      },
      {
        title:'Salud',
        icon:'beach',
      },
      {
        title:'Educación',
        icon:'beach',
      },
      {
        title:'Compras',
        icon:'beach',
      },
      {
        title:'Ocio',
        icon:'beach',
      },
      {
        title:'Desarrollo',
        icon:'beach',
      },
      {
        title:'Otros',
        icon:'beach',
      }
    ]
}

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id._id,
    alerts:state.alert
  }
}

export default connect(mapStateToProps)(ViewModal);
