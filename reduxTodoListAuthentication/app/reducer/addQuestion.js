
module.exports = (state=[], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [
        ...state,
        {
          title:action.title.value,
          category:action.category.value
        }
      ]
    case 'SET_QUESTION':
      return action.questions
    default:
      return state
  }
}
