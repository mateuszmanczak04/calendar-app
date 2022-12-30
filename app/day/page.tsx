'use client';

import { useRouter } from 'next/router';
import { getDateSlug } from '../../lib/getDateSlug';

const DayPage = () => {
  const router = useRouter();
  const slug = getDateSlug(new Date());
  router.replace(`/day/${slug}`);

  return <div></div>;
};

export default DayPage;
