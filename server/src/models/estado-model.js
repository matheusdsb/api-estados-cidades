const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EstadoSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	},
	abreviacao: {
		type: String,
		required: true
	},
    cidades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cidade"
    }]
}, {
    timestamps: { 
        createdAt: 'created_at' ,
        updatedAt: 'updated_at' ,
    }
});

EstadoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Estado', EstadoSchema);