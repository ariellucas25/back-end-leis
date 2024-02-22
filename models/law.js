const { model, Schema } = require("mongoose")

const lawSchema = new Schema({
    titulo: String,
    descricao: String,
    impacto: String, 
    isFavorite: Boolean
})

module.exports = model('Law', lawSchema);