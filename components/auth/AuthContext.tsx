
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'SIGN_OUT':
      return { user: null, isAuthenticated: false, isLoading: false };
    case 'LOADING':
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOADING' });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      firstName: 'Demo',
      lastName: 'User',
      email: email,
    };
    dispatch({ type: 'SIGN_IN', payload: user });
  };

  const signUp = async (firstName: string, lastName: string, email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOADING' });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName,
      lastName,
      email,
    };
    dispatch({ type: 'SIGN_IN', payload: user });
  };

  const signOut = (): void => {
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
