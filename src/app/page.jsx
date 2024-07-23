'use client';

import React from 'react';
import RegisterLogin from '@/components/RegisterLogin';
import BackgroundImage from 'next/image';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <BackgroundImage
        src="/images/images/family-budget-29-blue-modern-simple-1-1-3787ef6620d3.webp"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-opacity-75 bg-gray-900"></div>
      <h1 className="text-white z-10 text-4xl font-bold">
        Welcome to Your Finance App
      </h1>
      <RegisterLogin />
    </main>
  );
};
export default Home;
