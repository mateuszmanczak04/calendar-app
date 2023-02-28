'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Month from './Month';

type PageProps = {
  params: {
    date: string;
  };
};

const MonthPage = (props: PageProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'authenticated') return <Month date={props.params.date} />;

  return null;
};

export default MonthPage;
