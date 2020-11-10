const estadoModel = require('../models/estado-model');

const loadEstado = async(req, res, next) => {
    
    const estado = await estadoModel.findById(req.body.estadoId);

    if(!estado) {
        return res.status(404).send('Estado não encontrado')
    }
    
    req.estado = estado    
    next()
}
module.exports = {loadEstado}