export const getInitials = (name: string) => {
  // if (!name || name === '') {
  //   return '';
  // }
  const initials = name
    .split(' ')
    .map((word: string) => word[0].toUpperCase())
    .join('');
  return initials;
};

export const timeToSeconds = (timeString: string) => {
  const hours =
    parseInt(
      timeString.split(':')[0]?.split('H')[0]
        ? timeString.split(':')[0]?.split('H')[0]
        : '0',
    ) * 3600;
  const minutes =
    parseInt(
      timeString.split(':')[1]?.split('M')[0]
        ? timeString.split(':')[1]?.split('M')[0]
        : '0',
    ) * 60;
  const seconds = parseInt(
    timeString.split(':')[2]?.split('S')[0]
      ? timeString.split(':')[2]?.split('S')[0]
      : '0',
  );

  return hours + minutes + seconds;
};

export const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  return `${hours}H:${minutes}M:${sec}S`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const Months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

export const Days = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
}