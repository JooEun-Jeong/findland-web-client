import React from 'react';

import { MainContent } from '@/renderer/containers/MainContent';
import { Footer, HeaderW } from '@containers';

export const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeaderW />
      <MainContent />
      <Footer />
    </React.Fragment>
  );
};
