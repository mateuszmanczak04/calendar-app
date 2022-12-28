'use client';

import React from 'react';
import { EventsContextProvider } from '../context/EventsContext';
import TopBar from './(components)/TopBar';
import './globals.css';

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
        <EventsContextProvider>
          <>
            <TopBar />
            {children}
          </>
        </EventsContextProvider>
      </body>
    </html>
  );
}
