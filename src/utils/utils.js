export const formatDate = (dateString) => {
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
  
    const [year, month, day] = dateString.split('-');
  
    const monthIndex = parseInt(month, 10) - 1;
    const dayNumber = parseInt(day, 10);
  
    return `${dayNumber} ${months[monthIndex]}`;
  }
 