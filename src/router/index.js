const {Router} = require('express');
const router = Router();

const controlador = require('../controller/admin.controller');

router.get('/', controlador.inicio);
router.get('/menu', controlador.menu);
router.get('/nosotros', controlador.nosotros);
router.get('/sucursales', controlador.sucursales);
router.get('/admin', controlador.admin);
module.exports = router;