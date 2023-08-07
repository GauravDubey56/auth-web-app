export const setLocalKey = (key, value) => {
  localStorage.setItem(key, value);
};
export const getLocalKey = (key) => {
  if(global?.window?.localStorage) {
    return localStorage.getItem(key);
  } else {
    return null
  }
};
export const removeLocalKey = (key) => {
  localStorage.removeItem(key);
};
export const isLoggedIn = () => {
    return getLocalKey('token') ? true : false;
}