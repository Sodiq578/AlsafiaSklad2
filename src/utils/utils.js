export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // oy 0 dan boshlanadi, shuning uchun +1 qo'shish kerak
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  }