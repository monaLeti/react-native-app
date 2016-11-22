module.exports = (state={}, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return {
        text :action.text
      }
    default:
      return state
  }
}
