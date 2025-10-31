// 1) Імпортуємо фабрику клієнта Supabase
import { createClient } from '@supabase/supabase-js';

// 2) Зчитуємо URL і ключ з environment-змінних, які надасть Vite під час збірки.
//   - VITE_SUPABASE_URL      → адреса  інстансу Supabase
//   - VITE_SUPABASE_ANON_KEY → публічний (anon) ключ для доступу з фронтенду
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 3) Створюємо singleton-клієнт — одну інстанцію на весь застосунок. Це економить ресурси і тримає однакові налаштування скрізь.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Тепер у будь-якому компоненті можна писати:
// import { supabase } from '../lib/supabase';
// і робити запити: supabase.from('books').select('*')