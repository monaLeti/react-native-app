import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var Filter = React.createClass({
  render(){
    console.log('FILTER');
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            Hola Filter
          </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:'black',
    fontSize:18
  }
});

export default Filter
