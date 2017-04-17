import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import {loginUser, signupUser, addAlert} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

// MyCustomInput.js

const Form = (props) => {
  const {
    input: {value, onChange},
    ...email
  } = props;

  return(
    <View style={styles.field}>
      <TextInput
        style={styles.textInput}
        placeholder='eMAIL'
        value={value}
        {...email}/>
    </View>
  )
}

class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleFormSubmit(props) {
    const { email} = props;
    console.log(props);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Lallana
          </Text>
        </View>
        <Field name="myField" component={Form}/>
        <TouchableOpacity
          onPress={this.handleFormSubmit(this.handleSubmit)}>
          <Text>log</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


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

export default reduxForm({
  form:'login',
}, null, null)(Login)
