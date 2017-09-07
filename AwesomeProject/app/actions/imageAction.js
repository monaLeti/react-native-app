import CryptoJS from 'crypto-js'
import axios from 'axios'

import {UPDATE_PROFILE_PIC} from '../api'

exports.uploadImage = (imgUri, user_id) => {
  console.log('uploadImage', imgUri, user_id);
  return function(dispatch){
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = '268466337376371'
    let api_secret = 'FroTzoH1p2TOsoFcPFQp6yZKbvc'
    let cloud = 'dslyml7fp'
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      let responseObj =JSON.parse(xhr._response);
      console.log(responseObj);
      let profilePicture = {
        img:responseObj.secure_url
      }
      return axios.put(UPDATE_PROFILE_PIC + user_id._id, profilePicture)
        .then((response) => {
          console.log('after UPDATE_PROFILE_PIC',response);
          var {user_id} = response.data
          dispatch(authUser(response.data))
        })
        .catch((err)=>{
          console.log('after err UPDATE_PROFILE_PIC',err);
        })
    };
    xhr.onerror = () => {
      console.log('onerror',xhr._response, xhr);
    };
    let formdata = new FormData();
    formdata.append('file', {uri: imgUri, type: 'image/jpg', name: 'upload.jpg'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }
}

authUser = (user_id) =>{
  return {
    type:'AUTH_USER',
    user_id
  }
}
