import { GlobalProvider } from './context/GlobalContext';

import { Root } from './Root';

export const App = () => {
  return (
    <GlobalProvider>
      <Root />
    </GlobalProvider>
  );
};
