const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');

const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post(
  '/register',
  [
    check('firstName', `Ім'я користувача не може бути порожнім.`).notEmpty(),
    check('lastName', `Прізвище користувача не може бути порожнім.`).notEmpty(),
    check('email', `Поле email не може бути порожнім.`).notEmpty(),
    check('sex', `Поле стать не може бути порожнім.`).notEmpty(),
    check('phone', `Поле телефон не може бути порожнім.`).notEmpty(),
    check(
      'password',
      'Пароль може мати мінімум 8 символів і максимум 16 символів.'
    ).isLength({ min: 8, max: 16 }),
  ],
  authMiddleware,
  roleMiddleware(['ADMINISTRATOR']),
  controller.rigistration
);
router.post('/login', controller.login);
router.get(
  '/GetAllUsers',
  authMiddleware,
  roleMiddleware(['ADMINISTRATOR']),
  controller.getUsers
);
router.delete(
  '/DeleteUser/:id',
  authMiddleware,
  roleMiddleware(['ADMINISTRATOR']),
  controller.deleteUser
);
router.post('/RefreshToken', controller.RefreshToken);
router.get('/logout/:userId', controller.logout);
router.post('/ChangePassword', authMiddleware, controller.changePassword);
router.get('/activate/:userId', controller.activate);
router.post('/ForgotPassword', controller.forgotPassword);
router.post('/updateProfile', authMiddleware, controller.updateProfile);
// router.get('/getNews', controller.getNews);
// router.post('/News', controller.addNews);

module.exports = router;
