var defaultState = {
  signUpField: undefined
}

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'SIGN_UP_1':
      console.log(state);
      console.log(action.signUpField);
      return state
    default:
      return state
  }
}
