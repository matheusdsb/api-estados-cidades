const express = require('express');
const router = express.Router();
const { loadEstado} = require('./middleware/estado-middleware')

// estados
const estadoController = require('./controllers/estado-controller');

router.get('/estados', estadoController.listar)
router.get('/estados/:id', estadoController.visualizar)
router.post('/estados/cadastrar', estadoController.cadastrar)
router.put('/estados/editar/:id', estadoController.editar)
router.delete('/estados/excluir/:id', estadoController.excluir)

// cidades
const cidadeController = require('./controllers/cidade-controller');

router.get('/cidades', cidadeController.listar)
router.get('/cidades/:id', cidadeController.visualizar)
router.post('/cidades/cadastrar', loadEstado, cidadeController.cadastrar)
router.put('/cidades/editar/:id', loadEstado, cidadeController.editar)
router.delete('/cidades/excluir/:id', cidadeController.excluir)

module.exports = router;