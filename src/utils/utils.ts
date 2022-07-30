export const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map((word: string) => word[0].toUpperCase())
    .join('');
  return initials;
};
