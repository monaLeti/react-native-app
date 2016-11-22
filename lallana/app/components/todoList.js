import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

var TodoList = React.createClass({
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>
            To-do list
          </Text>
        </View>
          <Text>
          </Text>
      </View>
      <ScrollView>
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar : {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {

  },
});

module.export = TodoList
