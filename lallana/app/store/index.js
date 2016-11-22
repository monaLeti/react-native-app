import {createStore} from 'redux';
import reducer from '../reducer';

var defaultState ={
  text: 'Default Text'
}

//InitialState from the store and returns a called to return a store
export var configureStore = (initialState=defaultState) => {
  return createStore(reducer, initialState)
}
