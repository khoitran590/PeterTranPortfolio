// src/App.js
import React from 'react';
import ReactLenis from 'lenis/react';
import Layout from './components/Layout';
import SinglePage from './components/SinglePage';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      <Layout>
        <SinglePage />
      </Layout>
    </ReactLenis>
  );
}

export default App;
