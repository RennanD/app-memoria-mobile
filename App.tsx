import React, { useEffect } from 'react';

import * as Updates from 'expo-updates';

import Index from './src';

const App: React.FC = () => {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      }
    }
    updateApp();
  }, []);
  return <Index />;
};

export default App;
