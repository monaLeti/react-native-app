import axios from 'axios'

import {SIGNUP_URL} from '../api'

// Remove once you have implemented signup
exports.signupUser = (signUpField) => {
  return function(dispatch){
    console.log('here',signUpField);
    return axios.post(SIGNUP_URL, signUpField).then((response)=>{
      var {user_id} = response.data
      console.log(response);
      // dispatch(addAlert(token))
      dispatch(signUpStep3(user_id))
    }).catch((error)=>{
      console.log(error);
      // dispatch(addAlert('Could not signup'))
    })
  }
}

export function signUpStep1(signUpField){
  return{
    type: 'SIGN_UP_1',
    signUpField
  }
}
export function signUpStep2(signUpField){
  return{
    type: 'SIGN_UP_2',
    signUpField
  }
}

signUpStep3 = (user_id) =>{
  return{
    type:'AUTH_USER',
    user_id
  }
}
