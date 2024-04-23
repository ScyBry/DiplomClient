export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};
