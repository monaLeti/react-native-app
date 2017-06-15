var defaultState = 'Main'

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_VIEW_APP':
      return action.view
    default:
      return state
  }
}
