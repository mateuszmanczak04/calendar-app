'use client';

import React from 'react';
import Week from './Week';

type PageProps = {
  params: {
    mondayDate: string;
  };
};

const DayPage = (props: PageProps) => {
  return <Week date={props.params.mondayDate} />;
};

export default DayPage;
