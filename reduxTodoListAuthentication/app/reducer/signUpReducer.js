var defaultState = {
  email:undefined,
  password:undefined,
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
      var preObject = Object.assign({}, state, action.signUpField)
      console.log(preObject);
      return preObject
    case 'SIGN_UP_3':
      return state //Set the last state as the default one
    default:
      return state
  }
}
