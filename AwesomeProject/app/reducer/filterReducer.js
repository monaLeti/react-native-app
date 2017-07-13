var defaultState = {
  categorySelected:[]
}

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'SELECT_CATEGORY_SELECTED':
      console.log('SELECT_CATEGORY_SELECTED',action.category);
      return {
        categorySelected:action.category
      }
    case 'SELECT_SORT_SELECTED':
      return {
        categorySelected:state.categorySelected,
        sortSelected:action.sort
      }
    default:
      return state

  }
}
