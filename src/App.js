// src/App.js
import React from 'react';
import Layout from './components/Layout';
import SectionTabs from './components/SectionTabs';
import useSectionRouter from './hooks/useSectionRouter';

function App() {
  const [section, goToSection] = useSectionRouter();

  return (
    <Layout section={section} onNavigate={goToSection}>
      <SectionTabs section={section} />
    </Layout>
  );
}

export default App;
