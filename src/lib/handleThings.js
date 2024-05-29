function getDate() {
  // Hàm hỗ trợ để thêm số 0 vào trước các số nhỏ hơn 10
  function padZero(num) {
    return num < 10 ? `0${num}` : num
  }

  const date = new Date()

  const hour = date.getHours()
  const minute = date.getMinutes()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  // Định dạng lại thành chuỗi 'dd-mm-yyyy'
  const formattedDate = `${hour}:${minute} - ${padZero(day)}/${padZero(
    month
  )}/${year}`

  return formattedDate
}

const getDateArr = () => {
  const date = new Date()

  const thu = date.getDay() + 1
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return [thu, day, month, year]
}

export { getDate, getDateArr }
