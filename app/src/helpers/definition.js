export const convertToCommentDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const commentDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
  return commentDate
};