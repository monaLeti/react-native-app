import React from 'react';
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {signUpStep1} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

var SignUpStep1 = React.createClass({
  onSubmit: function(){
    var {dispatch} = this.props
    console.log('submit');
    console.log(this.props);
    var signUpField = {
      name:this.props.fields.name.value,
      lastName:this.props.fields.lastName.value
    }
    dispatch(signUpStep1(signUpField))
    this.props.navigator.push({id:'SignUpStep2'})
  },
  backRoute:function(){
    this.props.navigator.pop()
  },
  render(){
    var {fields:{name, lastName}} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.navigator}>
          <TouchableOpacity onPress={this.backRoute}>
            <Image source={require('../common/img/back_white.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Image
            style={styles.ImgElement}
            source={require('./common/img/baby.png')}>
            <Text style={styles.textImage}>
              Me llamo...
            </Text>
          </Image>
          <View style={styles.form}>
            <View style={styles.field}>
              <TextInput
                {...name}
                style={styles.textInput}
                placeholder="Nombre"
                placeholderTextColor="#ddd"/>
            </View>
            <View style={styles.field}>
              <TextInput
                {...lastName}
                style={styles.textInput}
                placeholder="Apellidos"
                placeholderTextColor="#ddd"/>
            </View>
            <View style={styles.buttonSubmit}>
              <TouchableOpacity
                onPress={this.onSubmit}>
                <Text style={styles.textButton}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column'
  },
  navigator: {
    flex:0,
    backgroundColor:'#5382AA',
    paddingTop:30,
    paddingBottom:15,
    paddingLeft:10
  },
  content:{
    flex:9,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ImgElement:{
    top:10,
    width:365,
    height:315
  },
  textImage:{
    top:55,
    left:150,
    fontSize:30,
    fontWeight: 'bold',
    color:'#5382AA'
  },
  form:{
    flex:2,
    justifyContent: 'center',
    paddingLeft:30,
    paddingRight:30
  },
  field:{
    backgroundColor:'#5382AA',
    borderRadius:10,
    marginTop:20,
    paddingLeft:10
  },
  textInput:{
    height:36,
    color:'#fff'
  },
  buttonSubmit:{
    width:130,
    left:170,
    marginTop:30
  },
  textButton:{
    height:46,
    fontSize:20,
    color:'white',
    backgroundColor:'#5382AA',
    paddingLeft:23,
    paddingTop:10
  }
});
export default reduxForm({
  form:'SignUpStep1',
  fields:['name', 'lastName']
}, null, null)(SignUpStep1)
