import axios from 'axios'
//We need to take the user authorization token for that with
//keychainfrom react-nativekeychain
//db.getCollection('questions').remove({})
import {ADD_QUESTION, GET_QUESTION} from '../api'

exports.createQuestion = (content, category, user_id) => {
  return function(dispatch){
    console.log(user_id);
    var newComment = {
      "category": category.value,
      "content": content.value,
      "user": user_id
    }
    return axios.post(ADD_QUESTION, newComment).then((response) => {
      console.log('respuesta',response.data.questions);
      dispatch(addQuestion(response.data.questions))
    }).catch((error) => {
      console.log('error',error);
    })
  }
}

exports.getQuestion = function(dispatch){
    return axios.get(GET_QUESTION).then((response) => {
      dispatch(setQuestion(response.data.questions))
    }).catch((error) => {
      console.log('error',error);
    })
}


addQuestion = (response) => {
  return {
    type:'ADD_QUESTION',
    response
  }
}

setQuestion = (questions) => {
  return {
    type:'SET_QUESTION',
    questions
  }
}
