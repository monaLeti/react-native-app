import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


class ProfileContact extends Component{

  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text>lalalalalal contacta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:'white',
  },
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id
  }
}

export default connect(mapStateToProps)(ProfileContact)
