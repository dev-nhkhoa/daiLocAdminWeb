function formattedDate() {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

  const day = date.getDate()
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()

  return `${hour}:${minute} ${day}/${month}/${year}`
}

export { formattedDate }
