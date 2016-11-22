import thunk from 'redux-thunk';
import {createStore, compose, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native'
import {persistStore, autoRehydrate} from 'redux-persist'
import reducer from '../reducer';

var defaultState ={
  // todos: []
}

//InitialState from the store and returns a called to return a store
export var configureStore = (initialState=defaultState) => {
  var store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    autoRehydrate()
  ))
  persistStore(store, {storage:AsyncStorage})
  return store
}
