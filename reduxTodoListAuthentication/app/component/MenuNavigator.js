import React, { Component } from 'react';
import {connect} from 'react-redux'
import {openSlideMenu, noOpenSlideMenu} from '../actions'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';

class MenuNavigator extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  // }
  showOrHideMenu(){
    var {dispatch} = this.props
    var open = this.props.open
    if (open) {
      dispatch(openSlideMenu(open))
    } else {
      dispatch(noOpenSlideMenu(open))
    }
  }
  render(){
    return (
      <View>
        <View style={styles.menuBar}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={()=>{this.showOrHideMenu()}}>
              <Image source={require('./common/img/hamburger.png')}></Image>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

var mapStateToProps = (state) =>{
  return {
    open: state.slideMenu.open
  }
}

export default connect(mapStateToProps)(MenuNavigator)
