'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getDateSlug } from '../../lib/getDateSlug';

const DayPage = () => {
  const router = useRouter();

  useEffect(() => {
    const slug = getDateSlug(new Date());
    router.replace(`/day/${slug}`);
  }, [router]);

  return <div></div>;
};

export default DayPage;
