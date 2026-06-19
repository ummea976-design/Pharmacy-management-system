const generateSaleId = () => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

module.exports = generateSaleId;

