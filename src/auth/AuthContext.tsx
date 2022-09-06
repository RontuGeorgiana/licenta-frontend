import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  userDetails: null as any,
  setAuthState: {} as any,
});

export function useAuthContext() {
  return useContext(AuthContext);
}