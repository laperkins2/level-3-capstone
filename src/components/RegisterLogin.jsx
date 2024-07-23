'use client';
import React, { useState } from 'react';
import { registerUser, login } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';

const RegisterLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      setShowLoginForm(true);
      setShowRegisterForm(false);
      router.push('/management');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setShowLoginForm(true);
      setShowRegisterForm(false);
      router.push('/management');
    } catch (error) {
      setError(error.message);
    }
  };

  const switchToLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setError(null);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg border-2 border-black w-full sm:w-96">
        {showRegisterForm && (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                <strong>Password:</strong>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>
            {error && <p>{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <strong>Register</strong>
              </button>
            </div>
          </form>
        )}

        {showLoginForm && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email-login">
                <strong>Email:</strong>
              </label>
              <input
                id="email-login"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="password-login">
                <strong>Password:</strong>
              </label>
              <input
                id="password-login"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>
            {error && <p>{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <strong>Login</strong>
              </button>
            </div>
          </form>
        )}

        {showRegisterForm && !showLoginForm && (
          <button
            onClick={switchToLoginForm}
            className="w-full bg-gray-300 text-gray-800 rounded-md py-2 px-4 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            <strong>Already have an account? Login</strong>
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterLogin;
