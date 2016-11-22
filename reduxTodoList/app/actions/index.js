exports.addTodo = (text) => {
  console.log('addTodo');
  return{
    type: 'ADD_TODO',
    text
  }
}
exports.deleteTodos = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
}
