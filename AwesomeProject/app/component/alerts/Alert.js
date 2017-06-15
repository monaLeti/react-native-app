 //Alert disappear when it is touched
import React from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import {removeAlert} from '../../actions'

var Alert = React.createClass({
  onRemoveAlert: function (){
    console.log('onRemoveAlert');
    // this.props.dispatch(removeAlert(this.props.alert.id)) is the same as
    var {dispatch, alert} = this.props
    console.log(alert.id);
    dispatch(removeAlert(alert.id))
  },
  render(){
    return (
      <TouchableWithoutFeedback onPress={this.onRemoveAlert}>
        <View style={styles.container}>
          <Text style={styles.textAlert}>
            {this.props.alert.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
    borderTopWidth: 2
  },
  textAlert: {
    color: '#a94442'
  }
});

export default connect()(Alert)
