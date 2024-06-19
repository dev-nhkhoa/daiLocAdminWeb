function formatCurrency(item) {
  return String(item)
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function resetString(item) {
  return String(item).replace(/,/g, '')
}

export { formatCurrency, resetString }
