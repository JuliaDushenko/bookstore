import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase.js';
import BookCard from '../components/BookCard.jsx';

export default function Catalog() {
  // Локальний стан компоненту:
  // books - усі книги з БД
  // q - рядок пошуку
  // tag - обраний жанр/тег
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');

  // 1) Завантажуємо дані з БД при монтуванні компоненту.
  useEffect(() => {
    (async () => {
      // SELECT * FROM books ORDER BY created_at DESC
      const { data, error } = await supabase
        .from('books')            // таблиця
        .select('*')              // стовпці
        .order('created_at', { ascending: false });

      if (error) {
        // У проді - показати користувачу дружнє повідомлення,
        // зібрати лог; тут - для простоти в консоль
        console.error(error);
        return;
      }
      // Записуємо масив книг у стан
      setBooks(data || []);
    })();
  }, []); // [] - ефект виконається лише 1 раз після першого рендера

  // 2) Будуємо список доступних тегів на основі отриманих даних.
  //    useMemo - щоб не рахувати щоразу при кожному рендері без потреби.
  const tags = useMemo(() => {
    const s = new Set();
    books.forEach(b => b.tag && s.add(b.tag));
    return Array.from(s);
  }, [books]);

  // 3) Фільтрація списку по тегу та рядку пошуку.
  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return books.filter(b => {
      const okTag = tag ? b.tag === tag : true;
      const okQ = ql
        ? (b.title?.toLowerCase().includes(ql) || b.author?.toLowerCase().includes(ql))
        : true;
      return okTag && okQ;
    });
  }, [books, q, tag]);

  return (
    <>
      {/* Панель інструментів: пошук + селектор тегів */}
      <section className="toolbar">
        <input
          type="search"
          placeholder="Пошук за назвою або автором…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Усі теги</option>
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </section>

      {/* Сітка карточок книг */}
      <section className="grid">
        {filtered.map(b => <BookCard key={b.id} book={b} />)}
        {filtered.length === 0 && <p>Книг не знайдено.</p>}
      </section>
    </>
  );
}