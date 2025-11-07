
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignInProps {
  onClose: () => void;
  switchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, switchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await signIn(email, password);
    onClose();
  };

  const handleDemo = (): void => {
    setEmail('app@alx.com');
    setPassword('password');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm border-2 p-3 rounded-2xl border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-3 rounded-2xl hover:bg-teal-700 disabled:bg-teal-400 transition duration-300 font-semibold"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={handleDemo}
          className="w-full bg-cyan-500 text-white py-3 rounded-2xl hover:bg-cyan-600 transition duration-300 font-semibold mt-4"
        >
          Use Exist Account
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <button onClick={switchToSignUp} className="text-teal-800 hover:text-teal-700 font-semibold hover:cursor-pointer">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
