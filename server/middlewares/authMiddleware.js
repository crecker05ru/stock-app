import jwt from 'jsonwebtoken'
export function verifyToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    const decoded = jwt.verify(token, 'your-secret-key')
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

import { SECRET_KEY } from './config.js' // Ваш секретный ключ для подписи JWT

/**
 * Middleware для проверки токена сессии.
 * Ищет токен в:
 * - Заголовке `Authorization: Bearer <token>`
 * - Куках `sessionToken`
 */
export const sessionTokenMiddleware = (req, res, next) => {
  // 1. Получаем токен из заголовка Authorization (Bearer Token)
  const authHeader = req.headers.authorization
  let token = null

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1] // Достаём токен после "Bearer "
  }
  // 2. Если нет в заголовке, проверяем куки
  else if (req.cookies?.sessionToken) {
    token = req.cookies.sessionToken
  }

  // 3. Если токена нет — ошибка 401
  if (!token) {
    return res.status(401).json({
      error: 'Токен сессии отсутствует',
    })
  }

  // 4. Верифицируем токен
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded // Добавляем данные пользователя в запрос
    next() // Передаём управление следующему middleware/роуту
  } catch (err) {
    // Ошибка верификации (просрочен, подделан и т.д.)
    return res.status(401).json({
      error: 'Недействительный токен сессии',
    })
  }
}

// module.exports = verifyToken
// module.exports = sessionTokenMiddleware
