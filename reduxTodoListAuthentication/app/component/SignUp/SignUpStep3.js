import React from 'react';
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {signupUser} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

var SignUpStep3 = React.createClass({
  onSubmit: function(){
    var {dispatch} = this.props
    console.log('submit');
    console.log(this.props);
    var signUpField = {
      email:this.props.fields.email.value,
      password:this.props.fields.password.value,
      name: this.props.name,
      lastName:this.props.lastName,
      location:this.props.location
    }
    console.log(signUpField);
    dispatch(signupUser(signUpField))
  },
  backRoute:function(){
    this.props.navigator.pop()
  },
  render(){
    var {fields:{email, password}} = this.props;
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
              Mi email y password son...
            </Text>
          </Image>
          <View style={styles.form}>
            <View style={styles.field}>
              <TextInput
                {...email}
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#ddd"/>
            </View>
            <View style={styles.field}>
              <TextInput
                {...password}
                style={styles.textInput}
                placeholder="Password"
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
    color:'#FFF'
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

SignUpStep3 = reduxForm({
  form:'SignUpStep3',
  fields:['email','password']
}, null, null)(SignUpStep3)

SignUpStep3 = connect(
  state => {
    return {
      name: state.signUp.name,
      lastName: state.signUp.lastName,
      location: state.signUp.location,
      sex:state.signUp.sex
    }
  }
)(SignUpStep3)

export default SignUpStep3
