import React from 'react';
import {Provider} from 'react-redux'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import {configureStore} from '../store';
import {changeText} from '../actions'
import TextComponent from './TextComponent'


var Home = React.createClass({

  onPressButton: function(){
    this.props.dispatch(changeText('new'))
  },

  changeText: function(){
    this.props.navigator.push({id:'OtherHome'})
    this.setState({
      text:'Hello updated'
    })
  },

  render(){
    return (
      <Provider store={configureStore()}>
        <View style={styles.container}>
          <Text style={styles.menu} >Current Scene: { this.props.title }</Text>
          <Image source={require('../assets/bq_login.png')} style={styles.backgroundImage}>
            <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
              <TextComponent/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.changeText}>
              <TextComponent/>
            </TouchableOpacity>
          </Image>
        </View>
      </Provider>

    );
  }
});


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  menu:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage:{
    flex: 9,
    resizeMode: 'cover',
  },
  button:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
