exports.addAlert  = (text) => {
  return {
    type:'ADD_ALERT',
    text
  }
}

exports.removeAlert = (id) => {
  console.log('actions',id);
  return {
    type:'REMOVE_ALERT',
    id
  }
}
