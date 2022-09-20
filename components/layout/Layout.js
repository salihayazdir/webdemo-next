import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout( { children } ) {

  return (
    <div className='flex flex-col justify-between min-h-screen'>
    <Header/>
    <main className='flex-1 p-6'>
      {children}
    </main>
    <Footer/>
    </div>
  )
}