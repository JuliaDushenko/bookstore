import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  // Компонент лише показує дані, не завантажує їх
  return (
    <article className="card">
      <img
        // Якщо немає зображення - показуємо плейсхолдер
        src={book.image_url || 'https://placehold.co/600x400?text=BookStore'}
        alt={book.title}
        // Якщо зображення впаде - теж ставимо плейсхолдер
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400?text=BookStore'; }}
      />
      <h3>{book.title}</h3>
      <p>Автор: {book.author}</p>

      {/* badge для тегу (жанру), якщо він є */}
      {book.tag && <p><span className="badge">{book.tag}</span></p>}

      <p><strong>{Number(book.price).toFixed(2)} UAH</strong></p>

      {/* Кнопка веде на маршрут book/:id → сторінка деталей */}
      <Link className="btn" to={`/book/${book.id}`}>Детальніше</Link>
    </article>
  );
}