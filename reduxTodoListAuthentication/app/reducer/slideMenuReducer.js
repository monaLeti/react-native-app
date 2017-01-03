var defaultState = {
  open: false
}

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'OPEN':
      return {
        open:!action.open
      }
    case 'NO-OPEN':
      return {
        open:!action.open
      }
    default:
      return defaultState
  }
}
