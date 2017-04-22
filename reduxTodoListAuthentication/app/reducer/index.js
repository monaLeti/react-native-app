import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import alertsReducer from './alertReducer'
import signUpReducer from './signUpReducer'
import addQuestion from './addQuestion'
import answerReducer from './answerReducer'
import filterReducer from './filterReducer'
import viewReducer from './viewReducer'

module.exports = combineReducers({
  form: formReducer,
  auth: authReducer,
  alert: alertsReducer,
  signUp: signUpReducer,
  questions: addQuestion,
  activeQuestion: answerReducer,
  filter: filterReducer,
  view:viewReducer,
})
