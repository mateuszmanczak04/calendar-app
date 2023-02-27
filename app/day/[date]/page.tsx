'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '../../(components)/Loading';
import Day from './Day';

type PageProps = {
  params: {
    date: string;
  };
};

const DayPage = (props: PageProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'authenticated') return <Day date={props.params.date} />;

  return null;
};

export default DayPage;
