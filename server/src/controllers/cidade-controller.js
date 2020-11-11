const cidadeModel = require('../models/cidade-model');

function loadObjectByRequest(req) {
    return {
        nome: req.body.nome,
        estadoId: req.estado.id
    }
}

function geraObjetosRetorno(cidades) {
    return [...cidades.map(c  => geraObjetoRetorno(c))]
}

function geraObjetoRetorno(cidade) {
    return {
        id: cidade._id,
        nome: cidade.nome,            
        estado: cidade.estadoId ? {
            id: cidade.estadoId._id,
            nome: cidade.estadoId.nome,
            abreviacao: cidade.estadoId.abreviacao
        } : {},
        dataCriacao: cidade.created_at.toLocaleString("pt-BR"),
        dataUltimaAtualizacao: cidade.updated_at.toLocaleString("pt-BR")
    }
}

module.exports = {
    async listar(req, res) {
        try {
            const cidades = await cidadeModel.find().populate("estadoId")
            const objetos = geraObjetosRetorno(cidades)
            return res.json(objetos)            
        } catch(e) {
            res.status(400).send(e.message)
        }
    },
    async visualizar(req, res) {
        try {            
            const cidade = await cidadeModel.findById(req.params.id).populate("estadoId");

            if(!cidade) {
                return res.status(404).send('Registro não encontrado')
            }

            return res.json(geraObjetoRetorno(cidade))
        } catch(e) {
            res.status(400).send(e.message)
        }
    },      
    async cadastrar(req, res) {
        try { 
            const obj = loadObjectByRequest(req)

            const cidade = await cidadeModel.create(obj)
            return res.json(geraObjetoRetorno(cidade))
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