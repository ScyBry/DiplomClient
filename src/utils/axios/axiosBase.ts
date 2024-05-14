export const setTokenToLocalStorage = (token: string) => {
  localStorage.removeItem('accessToken');
  localStorage.setItem('accessToken', token);
  return true;
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};
