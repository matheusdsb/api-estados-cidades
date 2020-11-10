const cidadeModel = require('../models/cidade-model');

function loadObjectByRequest(req) {
    return {
        nome: req.body.nome,
        estadoId: req.estado.id
    }
}

module.exports = {
    async listar(req, res) {
        try {
            const cidades = await cidadeModel.find();
            return res.json(cidades)
        } catch(e) {
            res.status(400).send(e.message)
        }
    },
    async cadastrar(req, res) {
        try { 
            const obj = loadObjectByRequest(req)

            const cidade = await cidadeModel.create(obj)
            return res.json(cidade)
        } catch(e) {
            res.status(400).send(e.message)
        }
    }, 
    async editar(req, res) {
        try {
            const id = req.params.id;
            const obj = loadObjectByRequest(req)

            const cidade = await cidadeModel.findByIdAndUpdate(id, obj, { new: true })
            
            if(!cidade) {
               return res.status(404).send('Registro não encontrado')
            }
            
            return res.json(cidade)
        } catch(e) {
            res.status(400).send(e.message)
        }
    },   
	async excluir(req, res) {
        try {
            const cidade = await cidadeModel.findByIdAndRemove(req.params.id);

            if(!cidade) {
                return res.status(404).send('Registro não encontrado')
             }

            return res.send(cidade);
        } catch(e) {
            res.status(400).send(e.message)
        }
	}     
}