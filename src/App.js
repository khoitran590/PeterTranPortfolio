// src/App.js
import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Gallery from './components/Gallery';

function App() {
  return (
    <Layout>
      <Home />
      <About />
      <Projects />
      <Skills />
      <Gallery />
      <Contact />
    </Layout>
  );
}

export default App;