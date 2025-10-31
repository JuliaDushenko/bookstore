import React from 'react';
import ReactDOM from 'react-dom/client';

// React Router створює "віртуальні сторінки" без перезавантаження сайту
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Компоненти-сторінки 
import App from './App.jsx';
import Catalog from './pages/Catalog.jsx';
import BookDetails from './pages/BookDetails.jsx';
import AddBook from './pages/AddBook.jsx';

// Глобальні стилі для всього застосунку
import './styles.css';

// 1) Опис таблиці маршрутів:
//    - path '/' → рендеримо <App/>, всередині якого <Outlet/> малює дочірні сторінки
//    - index: true → це "головна" сторінка для '/', рендерить <Catalog/>
//    - 'book/:id' → динамічний маршрут: :id ми прочитаємо через useParams()
//    - 'add' → сторінка з формою додавання книги
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Catalog /> },
      { path: 'book/:id', element: <BookDetails /> },
      { path: 'add', element: <AddBook /> },
    ],
  },
]);

// 2) Монтуємо RouterProvider, який увімкне роботу маршрутизатора у всьому застосунку
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
