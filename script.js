const demoBooks = [
  { id: 1, title: "Тіні забутих предків", author: "Михайло Коцюбинський", price: 199, tag: "Класика", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Місто", author: "Валер'ян Підмогильний", price: 249, tag: "Українська література", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Захар Беркут", author: "Іван Франко", price: 159, tag: "Історичний роман", img: "https://images.unsplash.com/photo-1526312426976-593c2586f3e1?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Кобзар", author: "Тарас Шевченко", price: 299, tag: "Поезія", img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop" }
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
