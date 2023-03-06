'use client';

import React from 'react';
import { DateContextProvider } from '../context/DateContext';
import { EventsContextProvider } from '../context/EventsContext';
import { LayoutContextProvider } from '../context/LayoutContext';
import TopBar from './(components)/TopBar';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import InsideLayout from './(components)/InsideLayout';
import { LoadingContextProvider } from '../context/LoadingContext';
import { EditContextProvider } from '../context/EditContext';

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
        <SessionProvider>
          <LoadingContextProvider>
            <EventsContextProvider>
              <LayoutContextProvider>
                <DateContextProvider>
                  <EditContextProvider>
                    <InsideLayout>{children}</InsideLayout>
                  </EditContextProvider>
                </DateContextProvider>
              </LayoutContextProvider>
            </EventsContextProvider>
          </LoadingContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
