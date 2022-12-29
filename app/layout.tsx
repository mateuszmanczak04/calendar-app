'use client';

import React from 'react';
import { DateContextProvider } from '../context/DateContext';
import { EventsContextProvider } from '../context/EventsContext';
import { LayoutContextProvider } from '../context/LayoutContext';
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
          <LayoutContextProvider>
            <DateContextProvider>
              <>
                <TopBar />
                {children}
              </>
            </DateContextProvider>
          </LayoutContextProvider>
        </EventsContextProvider>
      </body>
    </html>
  );
}
