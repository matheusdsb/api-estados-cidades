
function montaOrdenacaoViaRequest(req) {
    const sort = req.query.sort
    if(sort) {
        const obj = JSON.parse(sort);
        if(obj.field == 'dataCriacao') {
            obj.field = 'created_at'
        }
        if(obj.field == 'dataUltimaAtualizacao') {
            obj.field = 'updated_at'
        }
        if(obj.field == 'estado') {
            obj.field = 'estadoId'
        }
        return {
            [obj.field]: obj.direction
        }
    }
    return { nome: "asc"}
}

module.exports = { montaOrdenacaoViaRequest }