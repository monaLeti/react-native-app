import uuid from 'uuid'

module.exports = (state={}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      var newTodos = [
        ...state.todos,
        {
            text: action.text,
            id: uuid.v4()
        }
      ]
      return{
        todos:newTodos
      }
    case 'DELETE_TODO':
      var newTodos = state.todos.filter((todo) => {
        if(todo.id == action.id){
          return false
        }else {
          return true
        }
      })
      return {
        todos: newTodos
      }
    default:
      return state
  }
}
