import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { IdentityContextProvider } from './Contexts/IdentityContext';
import Router from './Router';
import { theme } from './Theme';
import "@fontsource/raleway";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <IdentityContextProvider>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </IdentityContextProvider>
  </React.StrictMode>
);
