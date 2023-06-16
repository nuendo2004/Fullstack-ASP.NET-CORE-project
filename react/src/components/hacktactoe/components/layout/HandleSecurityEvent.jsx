import { useEffect } from 'react';

export const HandleSecurityEvent = (callback, targetKeys, uid, currentUser, action) => {
  let currentPressed = [];
  const checkPressedKeys = () => {
    let count = targetKeys.length;
    targetKeys.forEach(targetKey => {
      if(currentPressed.find(pressedKey => pressedKey === targetKey)){
        count -= 1;
      }
    });
    return count;
  }
  const keydownHandler = (e) => {
    if(!currentPressed.find(ele => ele === e.key)){
      currentPressed.push(e.key);
    }
    if(currentPressed.length === targetKeys.length){
      if(checkPressedKeys() === 0){
        callback(uid, currentUser,action);
      }
    }
  }
  const keyupHandler = (e) => {
    currentPressed = currentPressed.filter(ele => ele !== e.key)
  }
  
  useEffect(() => {
      window.addEventListener('keydown',keydownHandler);
      window.addEventListener('keyup', keyupHandler);
      return () => {
        window.removeEventListener('keyup',keyupHandler);
        window.removeEventListener('keydown',keydownHandler);
      }
  }, [callback,targetKeys])
}