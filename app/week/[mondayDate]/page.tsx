'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loading from '../../(components)/Loading';
import Week from './Week';

type PageProps = {
  params: {
    mondayDate: string;
  };
};

const WeekPage = (props: PageProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'authenticated')
    return <Week date={props.params.mondayDate} />;

  return null;
};

export default WeekPage;
