import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setAuthState: {} as any,
});

export function useAuthContext() {
  return useContext(AuthContext);
}