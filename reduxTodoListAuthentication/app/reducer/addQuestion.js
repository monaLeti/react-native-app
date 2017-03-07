
module.exports = (state=[], action) => {

  switch (action.type) {
    case 'ADD_QUESTION':
      console.log('ADD_QUESTION',action);
      return action.response
    case 'SET_QUESTION':
      console.log('SET_QUESTION',action);
      return action.questions
    default:
      return state
  }
}
