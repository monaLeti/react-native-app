import React from 'react';
import {connect} from 'react-redux'
import {unauthUser} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';

var Main = React.createClass({
  onLogout: function(){
    this.props.dispatch(unauthUser)
  },
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.menuBar}>
          <TouchableOpacity style={styles.menuIcon}>
            <Image source={require('./common/img/hamburger.png')}></Image>
            <Picker style={styles.picker}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </TouchableOpacity>
          <View style={styles.menuCategory}>
            <TouchableOpacity style={styles.menuCategory}>
              <Text style={styles.menuText}>
                Todas
              </Text>
              <Image source={require('./common/img/arrow.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuCategory}>
              <Text style={styles.menuText}>
                Recientes
              </Text>
              <Image source={require('./common/img/arrow.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.menuCategory}>
            <TouchableOpacity style={styles.menuIcon}>
              <Image source={require('./common/img/search.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuIcon}>
              <Image source={require('./common/img/more.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuOverflow}>
          <TouchableOpacity onPress={this.onLogout}>
            <Text>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop:20,
    backgroundColor:'#ddd'
  },
  menuBar:{
    height:30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuIcon:{
    paddingLeft:10,
    paddingRight:10
  },
  menuCategory:{
    flexDirection: 'row',
    paddingLeft:15
  },
  menuText:{
    color:'white',
    fontSize:16
  },
  content:{
    backgroundColor:'blue'
  },
  menuOverflow:{
    backgroundColor:'blue',
    height:300,
    width:170
  }
});

export default connect()(Main)
