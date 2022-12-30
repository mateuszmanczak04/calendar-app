import React from 'react';
import Day from './Day';

type PageProps = {
  params: {
    date: string;
  };
};

const DayPage = (props: PageProps) => {
  return <Day date={props.params.date} />;
};

export default DayPage;
