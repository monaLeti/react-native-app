var defaultState = 'Main'

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_VIEW_APP':
      console.log('SET_VIEW_APP',action.view);
      return action.view
    default:
      return state
  }
}
