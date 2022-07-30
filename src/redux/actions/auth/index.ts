import axios from 'axios';

export const login = (payload: any) => {
  const apiURL = `${process.env.REACT_APP_API_URL}/auth/login`;

  return axios.post(apiURL, payload).then(async (response: any) => {
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }
    return response.data;
  });
};

export const signup = (payload: any) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/users/create-user`;

  return axios.post(apiUrl, payload).then(async (response: any) => {
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
    }
    return response.data;
  });
};
