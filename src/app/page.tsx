import React from 'react';
import Banner from './components/homepage/Banner';
import WorkOutLibrary from './components/homepage/WorkOutLibrary';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0c0e12]">
      <Banner />
      <WorkOutLibrary />
    </div>
  );
}