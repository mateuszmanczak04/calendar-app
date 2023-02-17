'use client';

import React from 'react';
import Month from './Month';

type PageProps = {
  params: {
    date: string;
  };
};

const DayPage = (props: PageProps) => {
  return <Month date={props.params.date} />;
};

export default DayPage;
