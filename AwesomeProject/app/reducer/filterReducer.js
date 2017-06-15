var defaultState = {
  categorySelected:'Todos',
  sortSelected:'Reciente'
}

module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'SELECT_CATEGORY_SELECTED':
      return {
        categorySelected:action.category,
        sortSelected:state.sortSelected
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
