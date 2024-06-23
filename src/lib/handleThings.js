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
  const formattedDate = `${hour}:${minute} - ${padZero(day)}/${padZero(month)}/${year}`

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

function getDateRange(selectedOption) {
  const today = new Date()
  let startDate, endDate

  switch (selectedOption) {
    case 'day':
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
      break
    case 'week':
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
      endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6, 23, 59, 59, 999)
      break
    case 'last-week':
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7)
      endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6, 23, 59, 59, 999)
      break
    case 'month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
      break
    case 'last-month':
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      endDate = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999)
      break
    case 'year':
      startDate = new Date(today.getFullYear(), 0, 1)
      endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999)
      break
    case 'last-year':
      startDate = new Date(today.getFullYear() - 1, 0, 1)
      endDate = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59, 999)
      break
    default:
      startDate = null
      endDate = null
  }

  const startDateString = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
  const endDateString = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`

  return [startDateString, endDateString]
}

function reverseDate(date) {
  return date.split('/').reverse().join('-')
}

export { getDate, getDateArr, getDateRange, reverseDate }
