'use client';

import React from 'react';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import InsideLayout from './(components)/InsideLayout';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

type LayoutProps = {
  children: React.ReactNode;
};

let persistor = persistStore(store);

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <head>
        <title>Calendar App</title>
      </head>
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SessionProvider>
              <InsideLayout>{children}</InsideLayout>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
