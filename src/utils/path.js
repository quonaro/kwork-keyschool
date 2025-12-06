/**
 * Утилита для работы с путями с учетом базового URL
 */
export function getAssetPath(path) {
  // Убираем ведущий слэш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Добавляем базовый путь
  const base = import.meta.env.BASE_URL
  // Убираем завершающий слэш из base, если есть
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base
  // Возвращаем полный путь
  return `${cleanBase}/${cleanPath}`
}

