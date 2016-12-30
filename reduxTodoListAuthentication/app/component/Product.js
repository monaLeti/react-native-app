import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var Product = React.createClass({
  render(){
    return (
      <View style={styles.container}>
          <Text>
            Hola Product
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

export default Product
