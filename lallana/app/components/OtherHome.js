import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Home from './Home'
import TextComponent from './TextComponent'

var OtherHome = React.createClass({

  onPressButton: function(){
    // this.setState({
    //   text:'Hello updated'
    // })
    this.props.navigator.push({
      id:'Home'
    })
  },

  render(){
    return (
      <View style={styles.container}>
        <Text>Current Scene: { this.props.title }</Text>
          <Image source={require('../assets/bq_login.png')} style={styles.backgroundImage}>
            <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
              <TextComponent text={'Go Next'}/>
            </TouchableOpacity>
          </Image>
      </View>
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
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
  },
  button:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OtherHome;
