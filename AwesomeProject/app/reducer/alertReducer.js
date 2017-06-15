//ALerts will be save as array
// Spread Operator
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// // Agregar todos los elementos de arr2 a arr1
// Array.prototype.push.apply(arr1, arr2);
// var arr1 = [0, 1, 2];
// var arr2 = [3, 4, 5];
// arr1.push(...arr2);
import uuid from 'uuid'

var defaultState = []
module.exports = (state=defaultState, action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return [
        ...state,
        {
          text: action.text,
          id: uuid.v4()
        }
    ]

    case 'REMOVE_ALERT':
      return state.filter((alert) => {
        if(alert.id === action.id){
          return false
        }else{
          return true
        }
      })
    default:
      return state

  }
}
