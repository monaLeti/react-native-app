import axios from 'axios'

import {SIGNIN_URL, SIGNIN_URL_WITH_FACEBOOK} from '../api'

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

exports.loginUserWithFacebook = () => {
  console.log('loginUserWithFacebook');
  return function(dispatch){
    return axios.get(SIGNIN_URL_WITH_FACEBOOK).then((response)=>{
      console.log('response loginUserWithFacebook', response.data);
      dispatch(authUser('1234'))
    }).catch((error)=>{
      console.log('error loginUserWithFacebook',error);
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

exports.unauthUser = ()=>{
  return {
    type:'UNAUTH_USER'
  }
}
