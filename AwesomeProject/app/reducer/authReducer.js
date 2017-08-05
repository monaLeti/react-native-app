var defaultState = {
  user_id:undefined
}

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      console.log('AUTH_USER',action.user_id);
      return {
        user_id:action.user_id
      }
    case 'UNAUTH_USER':
      return{
        user_id:undefined
      }
    default:
      return state

  }
}