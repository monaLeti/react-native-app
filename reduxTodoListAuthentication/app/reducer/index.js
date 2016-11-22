import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import alertsReducer from './alertReducer'

module.exports = combineReducers({
  form: formReducer,
  auth: authReducer,
  alert: alertsReducer
})
