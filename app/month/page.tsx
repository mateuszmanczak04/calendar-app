'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../(components)/Loading';
import { useDateContext } from '../../context/useDateContext';
import { getDateSlug } from '../../lib/getDateSlug';

const MonthPage = () => {
  const router = useRouter();
  const { currentDate } = useDateContext();

  useEffect(() => {
    const slug = getDateSlug(currentDate);
    router.replace(`/month/${slug}`);
  }, [currentDate, router]);
};

export default MonthPage;
