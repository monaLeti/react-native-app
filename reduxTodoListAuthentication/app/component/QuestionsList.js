import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var QuestionsList = React.createClass({
  render(){
    return (
      <View style={styles.container}>
          <Text>
            QuestionsList
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

export default QuestionsList
