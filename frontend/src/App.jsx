import { Outlet, NavLink } from 'react-router-dom';

export default function App() {
  return (
    <div className="container">
      {/* Шапка з назвою та навігацією */}
      <header className="header">
        <h1>📚 BookStore</h1>
        <nav>
          {/* NavLink автоматично додає клас .active для активного маршруту */}
          <NavLink to="/" end>Каталог</NavLink>
          <NavLink to="/add">Додати книгу</NavLink>
        </nav>
      </header>

      {/* Тут React Router рендерить потрібну сторінку залежно від URL */}
      <main>
        <Outlet />
      </main>

      {/* Футер (постійний на всіх сторінках) */}
      <footer className="footer">
        <small>© 2025 BookStore</small>
      </footer>
    </div>
  );
}