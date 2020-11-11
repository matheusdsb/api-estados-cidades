const cidadeModel = require('../models/cidade-model');
const { montaOrdenacaoViaRequest } = require('../helpers/ordenacao-helper')
const { geraDataBr } = require('../helpers/timezone-helper')

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
        dataCriacao: geraDataBr(cidade.created_at),
        dataUltimaAtualizacao: geraDataBr(cidade.updated_at)
    }
}

function montaBuscaViaRequest(req) {
    const search = req.query.search;                            
    if (search) { 
        return { nome: { $regex: new RegExp(search, 'i') }}
    }
    return {}
}

module.exports = {
    async listar(req, res) {
        try {
            const busca = montaBuscaViaRequest(req)
            const ordenacao = montaOrdenacaoViaRequest(req)
            const cidades = await cidadeModel.find(busca).populate("estadoId").sort(ordenacao)            
            return res.json(geraObjetosRetorno(cidades))            
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