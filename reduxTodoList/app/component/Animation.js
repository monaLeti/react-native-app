// Animation from the react-native example.
// It makes that the text bote, es decir va de escalar 1.5 a 0.8 varias veces.
// Las veces depende de la friction. Menor friction bota mucho mas.
// La function Animated.spring() es un tipo de animacion
//Hay dos tipos de Values: Value o ValueXY dependiento de si es unidimentional or bidimensional
//Hay tres tipos de animacion: spring, decay and timing.
// Spring es el rebote que hemos dicho
//Timing en este caso desciende de 1.5 a 0.8(creo q no afecta friction)
//Se puede hace cualquier tipo de animacion con Animated.createAnimatedComponent.
//Easing module gives more options

import React, { Component } from 'react';
import {connect} from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated
} from 'react-native';

class Animation extends Component {
  constructor(props){
    super(props)
    this.state = {
      bounceValue: new Animated.ValueXY(0,0),
    };
  }

  componentDidMount(){
    this.state.bounceValue.setValue(30,30)
    console.log(this.state.bounceValue);
    Animated.spring(
        this.state.bounceValue,
        {
          toValue:{x:0.8, y:0.8},
          friction:4
        }
    ).start()
  }
  render(){
    return (
      <View style={styles.topNavBar}>
        <TouchableHighlight underlayColor='transparent' style={styles.plusButton}>
          <Animated.Text
            style={{transform:[
              {translateX: this.state.bounceValue.x},
              {translateY: this.state.bounceValue.y}
            ]}}>Leti</Animated.Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:20,
    paddingLeft:10,
    backgroundColor: '#35D0C1',
  },
  plusButton:{
    justifyContent: 'center'
  },
})

export default Animation
