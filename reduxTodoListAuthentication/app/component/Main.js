import React from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Main = React.createClass({
  onLogout: function(){
    this.props.dispatch(unauthUser)
  },
  render(){
    return (
      <View style={styles.container}>
          <Text>
            Welcome to Main
          </Text>
          <TouchableOpacity onPress={this.onLogout}>
            <Text>
              Log Out
            </Text>
          </TouchableOpacity>
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
});

export default connect()(Main)
