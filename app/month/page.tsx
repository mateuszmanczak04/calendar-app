'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDateContext } from '../../context/useDateContext';
import { getDateSlug } from '../../lib/getDateSlug';

const MonthPage = () => {
  const router = useRouter();
  const { currentDate } = useDateContext();

  useEffect(() => {
    const slug = getDateSlug(currentDate);
    router.replace(`/month/${slug}`);
    // window.history.replaceState(null, 'Calendar App', `/week/${slug}`);
  }, [router, currentDate]);

  return <div></div>;
};

export default MonthPage;
