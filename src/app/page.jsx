'use client';

import React from 'react';
import RegisterLogin from '@/components/RegisterLogin';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Your Finance App</h1>
      <RegisterLogin />
    </main>
  );
};
export default Home;
