export const formatDate = (date, format="yyyy-MM-dd") => format
  .replace(/yyyy/, date.getFullYear())
  .replace(/MM/, ("0" + date.getMonth() + 1).slice(-2))
  .replace(/dd/, ("0" + date.getDate()).slice(-2))