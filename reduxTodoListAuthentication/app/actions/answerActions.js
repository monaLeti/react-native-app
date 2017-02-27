exports.selectActiveQuestion = (question) => {
  console.log('selectActiveQuestion', question);
  return{
    type:'SELECT_ACTIVE_QUESTION',
    question
  }
}
