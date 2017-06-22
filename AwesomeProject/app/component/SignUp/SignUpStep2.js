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

var SignUpStep2 = React.createClass({
  onSubmit: function(){
    var {dispatch} = this.props
    var signUpField = {
      email:this.props.fields.email.value,
      password:this.props.fields.password.value,
      name: this.props.name,
      lastName:this.props.lastName,
      location:this.props.location
    }
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
          <View style={styles.form}>
            <View style={styles.field}>
              <TextInput
                {...email}
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="white"/>
            </View>
            <View style={styles.field}>
              <TextInput
                {...password}
                secureTextEntry = {true}
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="white"/>
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
    backgroundColor:'#35D0C1',
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
    color:'#35D0C1'
  },
  form:{
    flex:2,
    justifyContent: 'center',
    paddingLeft:30,
    paddingRight:30
  },
  field:{
    backgroundColor:'#35D0C1',
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
    backgroundColor:'#35D0C1',
    paddingLeft:23,
    paddingTop:10
  }
});

SignUpStep2 = reduxForm({
  form:'SignUpStep2',
  fields:['email','password']
}, null, null)(SignUpStep2)

SignUpStep2 = connect(
  state => {
    return {
      name: state.signUp.name,
      lastName: state.signUp.lastName,
      location: state.signUp.location,
      sex:state.signUp.sex
    }
  }
)(SignUpStep2)

export default SignUpStep2
