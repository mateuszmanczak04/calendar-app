import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import { useLoadingContext } from '../../context/useLoadingContext';
import Loading from './Loading';
import TopBar from './TopBar';

const InsideLayout = ({ children }: { children: ReactNode }) => {
  const { loading } = useLoadingContext();

  if (loading) {
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
