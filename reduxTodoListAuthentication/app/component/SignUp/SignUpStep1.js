import React from 'react';
import {connect} from 'react-redux'
// import {unauthUser} from '../actions'
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
    console.log('submit');
  },
  backRoute:function(){
    this.props.navigator.pop()
  },
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.navigator}>
          <TouchableOpacity onPress={this.backRoute}>
            <Image source={require('../common/img/back.png')}/>
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
                value={name}
                style={styles.textInput}
                placeholder="Nombre"
                placeholderTextColor="#ddd"/>
            </View>
            <View style={styles.field}>
              <TextInput
                style={styles.textInput}
                placeholder="Apellidos"
                placeholderTextColor="#ddd"/>
            </View>
            <View style={styles.buttonSubmit}>
              <TouchableOpacity
                style={styles.textInput}
                onPress={this.onSubmit}>
                <Text>Siguiente</Text>
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
    flex:1,
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
    height:36
  },
  buttonSubmit:{
    width:140,
    backgroundColor:'#5382AA',
    borderRadius:10,
    marginTop:20,
    paddingLeft:10
  }
});

export default connect()(SignUpStep1)
