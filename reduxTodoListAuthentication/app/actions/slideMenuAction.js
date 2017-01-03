export function openSlideMenu (open){
  return{
    type: 'OPEN',
    open
  }
}
export function noOpenSlideMenu (open){
  return{
    type: 'NO-OPEN',
    open
  }
}
