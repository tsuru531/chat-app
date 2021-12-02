export const convertToCommentDate = date => {
  const padding = number => number.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = padding(date.getMonth() + 1);
  const day = padding(date.getDate());
  const hours = padding(date.getHours());
  const minutes = padding(date.getMinutes());
  const seconds = padding(date.getSeconds());
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};