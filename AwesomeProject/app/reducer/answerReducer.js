var defaultState = {
  "_id":"jhfh3838392",
  "content":"Tengo una niña de dos años, que puedo haver pars entretenerla",
  "date":"2017-02-26T08:11:57.716Z",
  "title":"Tengo una niña de dos años, que puedo haver pars entretenerla",
  "category":"Niña dos años",
  "answers":[
    {
      "_id":"jhfh3838392",
      "content":"Tengo una niña de dos años, que puedo haver pars entretenerla",
      "date":"2017-02-26T08:11:57.716Z",
      "title":"Tengo una niña de dos años, que puedo haver pars entretenerla",
      "category":"Niña dos años"
    },
    {
      "_id":"jhfh3838392",
      "content":"Tengo una niña de dos años, que puedo haver pars entretenerla",
      "date":"2017-02-26T08:11:57.716Z",
      "title":"Tengo una niña de dos años, que puedo haver pars entretenerla",
      "category":"Niña dos años"
    }
  ]
}

module.exports = (state={},action) =>{
  switch (action.type) {
    case 'SELECT_ACTIVE_QUESTION':
      return action.question
    case 'ADD_NEW_ANSWER':
      console.log('ADD_NEW_ANSWER', action.question);
      return action.question
    default:
      return state
  }
}
