import { useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { fetchAllUserEvents } from '../../redux/events';
import Loading from './Loading';
import TopBar from './TopBar';
import { useAppDispatch } from '../../redux/store';

const InsideLayout = ({ children }: { children: ReactNode }) => {
  const { loading } = useLoading();
  const { data: session } = useSession();

  // redux
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session && session.user && session.user.email)
      dispatch(fetchAllUserEvents(session.user.email));
  }, [session, dispatch]);

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
