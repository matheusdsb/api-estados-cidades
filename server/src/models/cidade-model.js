const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const estadoModel = require('../models/estado-model');

const CidadeSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	},
	estadoId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Estado",
		required: true
	}
}, {
    timestamps: { 
        createdAt: 'created_at' ,
        updatedAt: 'updated_at' ,
    }
});

CidadeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Cidade', CidadeSchema);