function formatCurrency(item) {
  return String(item)
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export { formatCurrency }
