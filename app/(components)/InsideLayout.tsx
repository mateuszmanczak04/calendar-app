import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import Loading from './Loading';
import TopBar from './TopBar';

const InsideLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className='pageContainer'>
      <TopBar />
      {children}
    </div>
  );
};

export default InsideLayout;
