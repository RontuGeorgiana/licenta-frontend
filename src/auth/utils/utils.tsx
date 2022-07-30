export const isUserLoggedIn = (): boolean => {
    const token = localStorage.getItem('accessToken');
    return token !== null && token.length > 0;
  };

  export const getUserId = (): string => {
    const userId = localStorage.getItem('userId');
    return userId ? userId : '';
  };
  
  export const getAuthToken = (): string => {
    const token = localStorage.getItem('accessToken');
    return token ? token : '';
  };