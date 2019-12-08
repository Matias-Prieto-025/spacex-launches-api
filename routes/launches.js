var express = require('express');
var router = express.Router();
const LaunchesController = require('../controllers/launches');
const AuthMiddleware = require('../middlewares/auth');

const authMiddleware = new AuthMiddleware();
const launchesController = new LaunchesController();

/* GET users listing. */
router.get('/', authMiddleware.Verify ,launchesController.index);
router.post('/favorite/:launchId', authMiddleware.Verify, launchesController.saveFavorite);

module.exports = router;
