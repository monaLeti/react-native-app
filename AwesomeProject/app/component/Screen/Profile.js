import React, { Component } from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../../actions'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  FlatList
} from 'react-native';
import ImagePicker from 'react-native-image-picker'

import NavigationTabs from './../common/NavigationTabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigatorProfile from '../Navigator/NavigatorProfile'
import ProfileFavourites from './ProfileFavourites'
import ProfileMyMessages from './ProfileMyMessages'
import ProfileContact from './ProfileContact'


class Profile extends Component{

  constructor(props){
    super(props)
    this.state = {
      avatarSource: null,
      videoSource: null,
      selected:'favourite'
    }
    console.log('Profile',props);
  }
  backbutton(){
    console.log('backbutton');
  }
  logOutUser(){
    this.props.dispatch(unauthUser())
  }

  selectPhotoTapped(){
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }
      ImagePicker.showImagePicker(options, (response) => {
        console.log('showImagePicker', response);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            avatarSource: source
          });
        }

      })
  }
  changeScreen(option){
    console.log('changeScreen',option);
    this.setState({
      selected:option
    })

  }
  setUnderlineColor(option){
    if(option == this.state.selected){
      return {
        borderBottomWidth:3,
        borderBottomColor:'#35D0C1'
      }
    }else{
      return{}
    }
  }
  setSelectedTitle(option){
    if(option == this.state.selected){
      return {
        color:'#35D0C1'
      }
    }else{
      return{}
    }
  }
  render(){
    var renderSelectedView = ()=>{
      console.log('renderSelectedView', this.state.selected);
      switch (this.state.selected) {
        case 'favourite':
          return <ProfileFavourites navigator={this.props.navigator}/>
        case 'myMessages':
          return <ProfileMyMessages/>
        case 'contact':
            return <ProfileContact/>
      }
    }

    return (
      <View style={styles.container}>
        <NavigationTabs/>
        <View style={styles.infoProfile}>
          <View style={styles.contentProfile}>
            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
             { this.state.avatarSource === null ? <Icon name="face" size={60} color='white'/> :
               <Image style={styles.avatar} source={this.state.avatarSource} />
             }
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
              <Icon name="settings" size={40} color='white' style={{backgroundColor: 'transparent'}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.updatePicture}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <Icon name="camera" size={40} color='white' style={{backgroundColor: 'transparent'}} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileOptions}>
          <View style={styles.profileOptionsHeader}>
            <TouchableOpacity style={this.setUnderlineColor('favourite')} onPress={this.changeScreen.bind(this, 'favourite')}>
              <Text style={[styles.profileOptionsHeaderItem, this.setSelectedTitle('favourite')]}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.setUnderlineColor('myMessages')} onPress={this.changeScreen.bind(this, 'myMessages')}>
              <Text style={[styles.profileOptionsHeaderItem, this.setSelectedTitle('myMessages')]}>Mis Mensajes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.setUnderlineColor('contact')} onPress={this.changeScreen.bind(this, 'contact')}>
              <Text style={[styles.profileOptionsHeaderItem, this.setSelectedTitle('contact')]}>Contacta</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderSelectedView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor:'rgb(231,235,238)',
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
  informationProfile:{
    marginLeft:60,
    justifyContent:'space-between'
  },
  avatarContainer: {
    borderColor: 'white',
    borderWidth: 2 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120
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
  profileOptions:{
    marginTop:10,
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor:'rgb(231,235,238)'
  },
  profileOptionsHeader:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  selected:{
    borderBottomWidth:3,
    borderBottomColor:'red'
  },
  profileOptionsHeaderItem:{
    padding:10,
    fontSize:18,
  },
});

var mapStateToProps = (state) => {
  return {
    user_id:state.auth.user_id
  }
}

export default connect(mapStateToProps)(Profile)
