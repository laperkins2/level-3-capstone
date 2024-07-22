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
    <div>
      {showRegisterForm && (
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {error && <p>{error}</p>}
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      )}

      {showLoginForm && (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email-login">Email</label>
            <input
              id="email-login"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="password-login">Password</label>
            <input
              id="password-login"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          {error && <p>{error}</p>}
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      )}

      {showRegisterForm && !showLoginForm && (
        <button onClick={switchToLoginForm}>
          Already have an account? Login
        </button>
      )}
    </div>
  );
};

export default RegisterLogin;
