import React from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Alert from './Alert'

var AlertContainer = React.createClass({
  render(){
    var renderAlerts = () => {
      return this.props.alert.map((alert) =>{
        return(
          <Alert alert={alert} key={alert.id}/>
        )
      })
    }
    return (
      <View style={styles.container}>
        {renderAlerts()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});

var mapStateToProps = (state) =>{
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps)(AlertContainer)
