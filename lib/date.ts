export const getDateAfter = (date: Date, amountOfDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amountOfDays);
  return newDate;
};

export const getDateBefore = (date: Date, amountOfDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - amountOfDays);
  return newDate;
};
