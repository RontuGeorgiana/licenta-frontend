export const getInitials = (name: string) => {
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

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
