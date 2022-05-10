export default function currencyFilter (val, currency = 'PLN') {
  return new Intl.NumberFormat('pl', {
    style: 'currency',
    currency: currency
  }).format(val)
}
