const estadoModel = require('../models/estado-model');

const loadEstado = async(req, res, next) => {
    try {
        const estado = await estadoModel.findById(req.body.estado.id);

        if(!estado) {
            return res.status(404).send('Estado não encontrado')
        }
        
        req.estado = estado    
        next()
    } catch(error) {
        return res.status(500).send(error.message)
    }
}
module.exports = {loadEstado}