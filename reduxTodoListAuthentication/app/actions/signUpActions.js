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
