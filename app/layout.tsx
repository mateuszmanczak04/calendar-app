'use client';

import React from 'react';
import { EventsContextProvider } from '../context/EventsContext';
import { LayoutContextProvider } from '../context/LayoutContext';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import InsideLayout from './(components)/InsideLayout';
import { LoadingContextProvider } from '../context/LoadingContext';
import { EditContextProvider } from '../context/EditContext';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <head>
        <title>Calendar App</title>
      </head>
      <body>
        <Provider store={store}>
          <SessionProvider>
            <LoadingContextProvider>
              <EventsContextProvider>
                <LayoutContextProvider>
                  <EditContextProvider>
                    <InsideLayout>{children}</InsideLayout>
                  </EditContextProvider>
                </LayoutContextProvider>
              </EventsContextProvider>
            </LoadingContextProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
