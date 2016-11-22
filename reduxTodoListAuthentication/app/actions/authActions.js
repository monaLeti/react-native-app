import axios from 'axios'

import {SIGNIN_URL, SIGNUP_URL} from '../api'

import {addAlert} from './alertsActions'

exports.loginUser = (email, password) => {
  console.log('loginUser');
  console.log(SIGNIN_URL);
  return function(dispatch){
    return axios.post(SIGNIN_URL, {email, password}).then((response)=>{
      var {user_id, token} = response.data
      dispatch(addAlert(token))
      dispatch(authUser(user_id))
    }).catch((error)=>{
      dispatch(addAlert('Could not login'))
    })
  }
}

exports.signupUser = (email, password) => {
  return function(dispatch){
    return axios.post(SIGNUP_URL, {email, password}).then((response)=>{
      var {user_id, token} = response.data
      dispatch(addAlert(token))
      dispatch(authUser(user_id))
    }).catch((error)=>{
      dispatch(addAlert('Could not signup'))
    })
  }
}

authUser = (user_id) =>{
  return {
    type:'AUTH_USER',
    user_id
  }
}

exports.unauthUser = {
  type:'UNAUTH_USER'
}
