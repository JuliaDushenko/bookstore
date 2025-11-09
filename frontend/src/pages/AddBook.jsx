import { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  // 1) Один об'єкт у стані для всіх полів форми 
  const [form, setForm] = useState({
    title: '', author: '', price: '', tag: '', image_url: '', description: ''
  });

  // 2) Стан завантаження - щоб вимикати кнопку під час запиту
  const [loading, setLoading] = useState(false);

  // 3) Навігація після успішного збереження
  const nav = useNavigate();

  // Хелпер: скорочуємо оновлення полів
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  // 4) Обробник сабміту: базова валідація → INSERT → навігація
  const onSubmit = async (e) => {
    e.preventDefault();

    // Проста валідація (у реальному проєкті - ще перевірки на бекенді/DB)
    if (!form.title || !form.author || !form.price) {
      alert('Назва, автор і ціна — обовʼязкові.');
      return;
    }

    setLoading(true);

    // INSERT INTO books (...) VALUES (...)
    const { error } = await supabase.from('books').insert([{
      title: form.title.trim(),
      author: form.author.trim(),
      price: Number(form.price),   // важливо привести до числа
      tag: form.tag.trim() || null,
      image_url: form.image_url.trim() || null,
      description: form.description.trim() || null,
    }]);

    setLoading(false);

    if (error) {
      // Якщо RLS-політики не дозволяють INSERT - буде помилка 401/403
      console.error(error);
      alert('Помилка збереження. Перевір поля або доступи (RLS у Supabase).');
    } else {
      // Успіх → повертаємося в каталог
      nav('/');
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Додати книгу</h2>

      <label>Назва
        <input value={form.title} onChange={set('title')} />
      </label>

      <label>Автор
        <input value={form.author} onChange={set('author')} />
      </label>

      <label>Ціна (UAH)
        <input type="number" step="0.01" value={form.price} onChange={set('price')} />
      </label>

      <label>Тег (жанр)
        <input value={form.tag} onChange={set('tag')} />
      </label>

      <label>Зображення (URL)
        <input value={form.image_url} onChange={set('image_url')} />
      </label>

      <label>Опис
        <textarea rows="4" value={form.description} onChange={set('description')} />
      </label>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Збереження…' : 'Зберегти'}
      </button>
    </form>
  );
}