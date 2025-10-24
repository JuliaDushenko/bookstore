const demoBooks = [
  { id: 1, title: "Тіні забутих предків", author: "Михайло Коцюбинський", price: 199, tag: "Класика", img: "https://cdn.planetakino.ua/3811_shadows-of-forgotten_1964/Media/Posters/vertical/opt_b1c8d4fa-b159-409c-8d12-1c0f898ec667.webp" },
  { id: 2, title: "Місто", author: "Валер'ян Підмогильний", price: 249, tag: "Українська література", img: "https://i.mbooks.com.ua/media/books/67e7a62c-318f-4f99-b128-c57a360e846f/covers/None/a34da7dd7fb0435db59eb064d1ce121c.jpeg" },
 { id: 3, title: "Захар Беркут", author: "Іван Франко", price: 159, tag: "Історичний роман",
  img: "https://i.mbooks.com.ua/media/books/fceef7f7-324f-4ba4-b971-a65f76f5479d/covers/None/ed2c282df9aa4cdf8145f44fd1aee242.jpeg" },
  { id: 4, title: "Кобзар", author: "Тарас Шевченко", price: 299, tag: "Поезія", img: "https://book24.ua/upload/iblock/3e0/3e00362c332ffb92c76522b1a135ec9f.png" }
];

const grid = document.getElementById("book-grid");
for (const b of demoBooks) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <img alt="${b.title}" src="${b.img}">
    <h3>${b.title}</h3>
    <p>Автор: ${b.author}</p>
    <p><span class="badge">${b.tag}</span></p>
    <p><strong>${b.price} UAH</strong></p>
  `;
  grid.appendChild(card);
}

console.log("BookStore: демо-каталог згенеровано на клієнті.");
