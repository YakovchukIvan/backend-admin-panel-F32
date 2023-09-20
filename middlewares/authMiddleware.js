const jwt = require('jsonwebtoken')
const { jwt_access_secret } = require('../config')

// Міддлвар - це функція, яка обробляє запити, перш ніж вони досягнуть обробника маршруту (route handler) або іншого міддлвару.
module.exports = function (req, res, next){
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    //получаємо токена
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: 'Користувач не авторизований'})  
    }
    //декудуємо токена
    const decodedData = jwt.verify(token, jwt_access_secret);
    req.user = decodedData
    next()

  } catch (error) {
    console.log(error);
    return res.status(401).json({message: 'Користувач не авторизований'})
  }


}