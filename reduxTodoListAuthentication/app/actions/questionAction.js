import axios from 'axios'
//We need to take the user authorization token for that with
//keychainfrom react-nativekeychain
//db.getCollection('questions').remove({})
import {ADD_QUESTION, GET_QUESTION, GET_QUESTION_BY_CATEGORY} from '../api'

exports.createQuestion = (content, category, user_id) => {
  return function(dispatch){
    var newComment = {
      "category": category,
      "content": content,
      "user": user_id
    }
    return axios.post(ADD_QUESTION, newComment).then((response) => {
      dispatch(addQuestion(response.data.questions))
    }).catch((error) => {
      console.log('error',error);
    })
  }
}

// Get all the questions
exports.getQuestion = (filterByPopularity) =>{
  return function(dispatch){
    if(filterByPopularity){
      console.log('get all question filter',filterByPopularity);
      return axios.get(GET_QUESTION + '?popular=-1').then((response) => {
        dispatch(setQuestion(response.data.questions))
      }).catch((error) => {
        console.log('error',error);
      })
    }
    console.log('get all question no filter',filterByPopularity);
    return axios.get(GET_QUESTION).then((response) => {
      dispatch(setQuestion(response.data.questions))
    }).catch((error) => {
      console.log('error',error);
    })
  }
}

// Get questions filer by category
exports.getQuestionByCategory = (category, filterByPopularity) =>{
  return function(dispatch){
    if(filterByPopularity){
      console.log('POPULAR');
      return axios.get(GET_QUESTION_BY_CATEGORY + category + '?popular=-1').then((response)=>{
        dispatch(setQuestion(response.data.questions))
      }).catch((err)=>{
        console.log(err);
      })
    } else {
      console.log('NO POPULAR');
      return axios.get(GET_QUESTION_BY_CATEGORY + category).then((response)=>{
        dispatch(setQuestion(response.data.questions))
      }).catch((err)=>{
        console.log(err);
      })
    }

  }
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
