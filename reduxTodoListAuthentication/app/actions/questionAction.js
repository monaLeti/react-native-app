import axios from 'axios'
//We need to take the user authorization token for that with
//keychainfrom react-nativekeychain
//db.getCollection('questions').remove({})
import {ADD_QUESTION, GET_QUESTION} from '../api'

exports.createQuestion = (title, category, user_id) => {
  return function(dispatch){
    console.log(user_id);
    var newComment = {
      "category": category.value,
      "content": title.value,
      "user": user_id
    }
    return axios.post(ADD_QUESTION, newComment).then((response) => {
      console.log('respuesta',response.data, user_id);
      dispatch(addQuestion(title, category))
    }).catch((error) => {
      console.log('error',error);
    })
  }
}

exports.getQuestion = function(dispatch){
    return axios.get(GET_QUESTION).then((response) => {
      console.log('respuesta',response.data);
      dispatch(setQuestion(response.data))
    }).catch((error) => {
      console.log('error',error);
    })
}


addQuestion = (title,category) => {
  return {
    type:'ADD_QUESTION',
    title,
    category
  }
}

setQuestion = (questions) => {
  return {
    type:'SET_QUESTION',
    questions
  }
}
