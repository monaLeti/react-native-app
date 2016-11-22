import React from 'react';
import {connect} from 'react-redux'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var TextComponent = React.createClass({
  render: function(){
    return(
      <View>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
})

var mapStateToProps = (state) => {
  return {
    text :state.text
  }
}

export default connect(mapStateToProps)(TextComponent);
