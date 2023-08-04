function formatRupiah(number) {
    if (typeof number !== 'number') {
      return '';
    }
  
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  
    return formatter.format(number);
}
  
module.exports = { formatRupiah };