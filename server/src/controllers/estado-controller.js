const estadoModel = require('../models/estado-model');

function geraObjetosRetorno(estados) {
    return [...estados.map(e => geraObjetoRetorno(e))];
}

function geraObjetoRetorno(estado) {
    return {
        id: estado._id,
        nome: estado.nome,
        abreviacao: estado.abreviacao,
        dataCriacao: estado.created_at.toLocaleString("pt-BR"),
        dataUltimaAtualizacao: estado.updated_at.toLocaleString("pt-BR")
    }
}

module.exports = {
    async listar(req, res) {
        try {
            const estados = await estadoModel.find();            
            return res.json(geraObjetosRetorno(estados))
        } catch(e) {
            res.status(400).send(e.message)
        }
    },
    async visualizar(req, res) {
        try {            
            const estado = await estadoModel.findById(req.params.id).populate("cidades");

            if(!estado) {
                return res.status(404).send('Registro não encontrado')
            }

            return res.json(geraObjetoRetorno(estado))
        } catch(e) {
            res.status(400).send(e.message)
        }
    },    
    async cadastrar(req, res) {
        try {            
            const estado = await estadoModel.create(req.body)
            return res.json(geraObjetoRetorno(estado))
        } catch(e) {
            res.status(400).send(e.message)
        }
    },
    async editar(req, res) {
        try {
            const id = req.params.id;
            const object = req.body;
            const estado = await estadoModel.findByIdAndUpdate(id, object, { new: true })
            
            if(!estado) {
               return res.status(404).send('Registro não encontrado')
            }
            
            return res.json(geraObjetoRetorno(estado))
        } catch(e) {
            res.status(400).send(e.message)
        }
    },
	async excluir(req, res) {
        try {
            const estado = await estadoModel.findByIdAndRemove(req.params.id);

            if(!estado) {
                return res.status(404).send('Registro não encontrado')
             }

            return res.send(geraObjetoRetorno(estado));
        } catch(e) {
            res.status(400).send(e.message)
        }
	}       
}