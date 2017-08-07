import axios from 'axios'
import {ADD_ANSWER, GET_ANSWERS} from '../api'

//Create a new answer
exports.createAnswer = (answer, category, user_id, questionId) => {
  var newObject = {
    "user":user_id,
    "content":answer,
    "category":category
  }
  return function(dispatch){
    return axios.post(ADD_ANSWER + questionId, newObject).then((response)=>{
      dispatch(addNewAnswer(response.data.question))
      console.log(response.data.question);
    }).catch((error)=>{
      console.log('createAnswer',error);
    })
  }
}


// Aqui llamamos al servidor para coger las respuestas de esa pregunta
exports.selectActiveQuestion = (question) => {
  console.log('selectActiveQuestion');
  return function(dispatch){
    return axios.get(GET_ANSWERS + question._id).then((response)=>{
      dispatch(questionActive(response.data.question))
    }).catch((error)=>{
      console.log('selectActiveQuestion',error);
    })
  }
}

questionActive = (question) => {
  return {
    type:'SELECT_ACTIVE_QUESTION',
    question
  }
}

addNewAnswer = (question) => {
  return {
    type:'ADD_NEW_ANSWER',
    question
  }
}
