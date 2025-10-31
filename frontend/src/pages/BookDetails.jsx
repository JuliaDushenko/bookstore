import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function BookDetails() {
  // 1) Дістаємо :id з URL 
  const { id } = useParams();

  // 2) Локальний стан для конкретної книги
  const [book, setBook] = useState(null);

  // 3) Завантажуємо книгу за id
  useEffect(() => {
    (async () => {
      // SELECT * FROM books WHERE id = :id LIMIT 1
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();  // .single() → чекаємо рівно один рядок

      if (error) {
        console.error(error);
        return;
      }
      setBook(data);
    })();
  }, [id]);

  if (!book) return <p>Завантаження…</p>;

  return (
    <article className="details">
      <img
        src={book.image_url || 'https://placehold.co/800x500?text=BookStore'}
        alt={book.title}
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x500D?text=BookStore'; }}
      />
      <div>
        <h2>{book.title}</h2>
        <p><strong>Автор:</strong> {book.author}</p>
        {book.tag && <p><strong>Тег:</strong> {book.tag}</p>}
        <p><strong>Ціна:</strong> {Number(book.price).toFixed(2)} UAH</p>
        {book.description && <p className="muted">{book.description}</p>}

        {/* Повернення до каталогу без перезавантаження сторінки */}
        <Link className="btn" to="/">← Повернутись до каталогу</Link>
      </div>
    </article>
  );
}