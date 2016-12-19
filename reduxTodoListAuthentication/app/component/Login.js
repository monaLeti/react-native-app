import React from 'react';
import {reduxForm} from 'redux-form'
import {loginUser, signupUser, addAlert} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

var Login = React.createClass({
  onSignIn: function(){
    var {dispatch, fields:{email, password}} = this.props
    dispatch(loginUser(email.value.toLowerCase(), password.value))
  },
  onSignUp: function(){
    // var {dispatch, fields:{email, password}} = this.props
    // dispatch(signupUser(email.value, password.value))
    this.props.navigator.push({id:'SignUpStep1'})
  },
  render(){
    var {fields:{email, password}} = this.props;

    var renderError = (field) => {
      if(field.touched && field.error){
        return(
          <Text style={styles.formError}>{field.error}</Text>
        )
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Lallana
          </Text>
        </View>
        <View style={styles.field}>
          <TextInput
            {...email}
            style={styles.textInput}
            placeholder="Email"/>
          <View>
            {renderError(email)}
          </View>
        </View>
        <View style={styles.field}>
          <TextInput
            {...password}
            secureTextEntry = {true}
            style={styles.textInput}
            placeholder="Password"/>
          <View>
            {renderError(password)}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.onSignIn}>
            <Text style={styles.button}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSignUp}>
            <Text style={styles.button}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop:20,
    backgroundColor:"#ddd"
  },
  titleContainer: {
    padding: 10,

  },
  title: {
    color:"white",
    fontSize:35
  },
  field: {
    borderRadius: 5,
    padding: 5,
    paddingLeft: 8 ,
    margin:7,
    marginTop: 0,
    backgroundColor:'white'
  },
  textInput:{
    height:26
  },
  buttonContainer:{
    padding: 20,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  button:{
    fontSize:30,
    color: 'white'
  },
  formError: {
    color: 'red'
  }
});

var validate = (formProps) => {
  var errors = {}
  if(!formProps.email){
    errors.email = "Please enter an email"
  }
  if(!formProps.password){
    errors.password = "Please enter a password"
  }
  return errors
}

export default reduxForm({
  form:'login',
  fields:['email', 'password'],
  validate:validate
}, null, null)(Login)
