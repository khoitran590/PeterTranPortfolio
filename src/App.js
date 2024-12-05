// src/App.js
import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <Layout>
      <Home />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;