import React from 'react';
import {Provider} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Navigator
} from 'react-native';

import Home from './app/components/Home'
import OtherHome from './app/components/OtherHome'
import TextComponent from './app/components/TextComponent'

var App = React.createClass({
  render(){
    return (
      <Navigator
        initialRoute={{id:'Home'}}
        renderScene={(route, navigator)=>
          {return this.renderScene(route,navigator)}
        }
      />
    );
  },

  renderScene: function(route,nav){
    switch (route.id) {
      case 'Home':
        return <Home title={route.title} navigator={nav}/>
      case 'OtherHome':
        return <OtherHome title={route.title} navigator={nav}/>
    }
  }
});

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
  },
});
export default App;
