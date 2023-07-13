import React, { useState, useEffect } from 'react';

import Section1 from '../components/home/Section1'
import Section2 from '../components/home/Section2'
import Section3 from '../components/home/Section3'

const Home = () => {
  
  useEffect(() => {
    document.title = 'Home - Hugutero Clothing';
  }, []);

  return (
    <>
        <main>
          <Section1 />
          <Section2 />
          <Section3 />
        </main>
    </>
  )
}

export default Home