import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


class ProfileFavourites extends Component{

  constructor(props){
    super(props)
  }

  onLogout(){
    let {dispatch} = this.props
    dispatch({type:'UNAUTH_USER'})
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLogout.bind(this)}>
          <Text>lalalalalal favourites</Text>
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

export default connect(mapStateToProps)(ProfileFavourites)
