import axios from 'axios'

import {SIGNIN_URL, SIGNUP_URL} from '../api'

import {addAlert} from './alertsActions'

exports.loginUser = (email, password) => {
  return function(dispatch){
    return axios.post(SIGNIN_URL, {email, password}).then((response)=>{
      var {user_id} = response.data
      console.log(response.data);
      // dispatch(addAlert(token))
      dispatch(authUser(user_id))
    }).catch((error)=>{
      console.log(error);
      dispatch(addAlert('Error al entrar.'))
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
