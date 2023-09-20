const jwt = require('jsonwebtoken')
const { jwt_access_secret } = require('../config')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({message: 'Користувач не авторизований.'})  
      }
      //декудуємо токена
      const {roles: userRoles} = jwt.verify(token, jwt_access_secret)
      let hasRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      });
      if (!hasRole) {
        return res.status(403).json({message: 'У вас нема доступу.'})
      }

      next()
    } catch (error) {
      console.log(error);
      return res.status(401).json({message: 'Користувач не авторизований.'})  
    }

  }
} 