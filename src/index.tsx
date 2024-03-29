import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { IdentityContextProvider } from './Contexts/IdentityContext';
import Router from './Router';
import { theme } from './Theme';
import CookieConcent from './Components/CookieConcent';
import { GiftContextProvider } from './Contexts/GiftContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <IdentityContextProvider>
      <GiftContextProvider>
        <ChakraProvider theme={theme}>
          <Router />
          <CookieConcent />
        </ChakraProvider>
      </GiftContextProvider>
    </IdentityContextProvider>
  </React.StrictMode>
);
