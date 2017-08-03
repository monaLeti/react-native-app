
module.exports = (state={},action) =>{
  switch (action.type) {
    case 'SELECT_ACTIVE_QUESTION':
      console.log('SELECT_ACTIVE_QUESTION', action.question);
      return action.question
    case 'ADD_NEW_ANSWER':
      return action.question
    default:
      return state
  }
}
