import axios from 'axios'

import {SIGNUP_URL} from '../api'

// exports.signupUser = (email, password) => {
//   return function(dispatch){
//     return axios.post(SIGNUP_URL, {email, password}).then((response)=>{
//       var {user_id, token} = response.data
//       dispatch(addAlert(token))
//       dispatch(authUser(user_id))
//     }).catch((error)=>{
//       dispatch(addAlert('Could not signup'))
//     })
//   }
// }


// Remove once you have implemented signup
exports.signupUser = (signUpField) => {
  return function(dispatch){
    console.log('here',signUpField);
    return axios.post(SIGNUP_URL, signUpField).then((response)=>{
      var {user_id, token} = response.data
      console.log(response);
      // dispatch(addAlert(token))
      dispatch(signUpStep3(user_id))
    }).catch((error)=>{
      console.log(error);
      // dispatch(addAlert('Could not signup'))
    })
  }
}

// authUser = (user_id) =>{
//   return {
//     type:'AUTH_USER',
//     user_id
//   }
// }

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
