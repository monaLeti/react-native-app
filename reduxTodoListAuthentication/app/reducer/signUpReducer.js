var defaultState = {
  name: undefined,
  lastName:undefined,
  location:undefined,
  sex:undefined
}

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'SIGN_UP_1':
      var preObject = Object.assign({}, state, action.signUpField)
      return preObject
    case 'SIGN_UP_2':
      console.log(action.signUpField);
      var preObject = Object.assign({}, state, action.signUpField)
      console.log(preObject);
      return state
    default:
      return state
  }
}
