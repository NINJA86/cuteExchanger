function flagConvertor(currency) {
  return currency.split('').slice(0, 2).join('').toLowerCase();
}
export { flagConvertor };
