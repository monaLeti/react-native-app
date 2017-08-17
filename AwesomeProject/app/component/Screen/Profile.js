import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import NavigationTabs from './../common/NavigationTabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Profile extends Component{
  constructor(props){
    super(props)
    console.log('Profile',props);
  }
  backbutton(){
    console.log('backbutton');
  }
  logOutUser(){
    this.props.dispatch(unauthUser())
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationTabs/>
        <View style={styles.infoProfile}>
          <View style={styles.contentProfile}>
            <View style={styles.pictureProfile}>
              <Icon name="face" size={60} color='white'/>
            </View>
            <View style={styles.informationProfile}>
              <View>
                <Text style={styles.textName}>{this.props.user_id.name}</Text>
                <Text style={styles.text}>Collado Villalba</Text>
              </View>
              <View style={styles.infoProfileContent}>
                <Text style={styles.textInfoProfileContent}>5 Favoritos</Text>
                <Text style={styles.textInfoProfileContent}>5 Likes</Text>
              </View>
            </View>
          </View>
          <View style={styles.configuration}>
            <TouchableOpacity onPress={this.backbutton.bind(this)}>
              <Icon name="settings" size={40} color='white'/>
            </TouchableOpacity>
          </View>
          <View style={styles.updatePicture}>
            <TouchableOpacity onPress={this.backbutton.bind(this)}>
              <Icon name="camera" size={40} color='white'/>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={this.logOutUser.bind(this)}>
          <Text>Log out</Text>
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
  infoProfile:{
    backgroundColor:'#42e5d5',
    marginTop:0,
    height: 175,
    padding:15,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  titleProfile:{
    alignItems:'center'
  },
  contentProfile:{
    flexDirection:'row',
  },
  pictureProfile:{
    padding:30,
    borderColor: 'white',
    borderWidth:2,
    borderRadius:60
  },
  informationProfile:{
    marginLeft:60,
    justifyContent:'space-between'
  },
  infoProfileContent:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textName:{
    color:'white',
    fontSize:25,
    fontWeight:'bold'
  },
  text:{
    color:'white',
    fontSize:14
  },
  textInfoProfileContent:{
    color:'white',
    fontSize:17
  },
  configuration:{
    position:'absolute',
    left:100,
    top:10,
  },
  updatePicture:{
    position:'absolute',
    left:100,
    top:100,
  },
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id
  }
}

export default connect(mapStateToProps)(Profile)
