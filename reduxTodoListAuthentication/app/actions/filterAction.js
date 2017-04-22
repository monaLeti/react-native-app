exports.setCategorySelected  = (category) => {
  return {
    type:'SELECT_CATEGORY_SELECTED',
    category
  }
}

exports.setSortSelected  = (sort) => {
  return {
    type:'SELECT_SORT_SELECTED',
    sort
  }
}
