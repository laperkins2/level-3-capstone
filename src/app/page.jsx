'use client';

import React from 'react';
import RegisterLogin from '@/components/RegisterLogin';
import Image from 'next/image';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/budgetpic.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-blue-700">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Saving For The Future
        </h1>
        <RegisterLogin />
      </div>
    </main>
  );
};
export default Home;
