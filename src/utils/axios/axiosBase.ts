export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

// export const axiosBase = axios.create({
//   baseURL: process.env.BASE_API_URL,
// });
//
// axiosBase.interceptors.request.use(config => {
//   const token = getTokenFromLocalStorage();
//
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//
//   return config;
// });
