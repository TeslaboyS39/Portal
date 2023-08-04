function formatDate(date) {
    const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleString('en-US', options);
}
  
module.exports = { formatDate };