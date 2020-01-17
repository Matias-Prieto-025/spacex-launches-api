var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../src/middlewares/auth');
const authMiddleware = new AuthMiddleware();

/* GET home page. */
router.get('/', authMiddleware.Verify ,function(req, res, next) {
  res.status(404).send('Page not found');
});

module.exports = router;
