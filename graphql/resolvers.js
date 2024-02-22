const Law = require('../models/law')
const typeDefs = require('./typeDefs');

module.exports = {
    Query: {
        async getLaw(_, {ID}){
            return await Law.findById(ID);
        },
        async getLaws(){
            return await Law.find();
        },
        async getFavoriteLaws(){
                const favoriteLaws = await Law.find({ isFavorite: true });
                return favoriteLaws;
              }
    },

    Mutation: {
        async createLaw(_, { lawInput }) {
            const { titulo, descricao, impacto, isFavorite } = lawInput;
        
            const createdLaw = new Law({
                titulo: titulo, 
                descricao: descricao, 
                impacto: impacto,
                isFavorite: isFavorite
            });
        

            const res = await createdLaw.save();
            console.log(res._doc);
            return {
                id: res.id,
                ...res._doc
            }
        },
        
        async toFavorite(_, { titulo }) {
            const law = await Law.findOne({ titulo: titulo });
            if (law) {
                law.isFavorite = !law.isFavorite;
                await law.save(); 
                return law;
            } else {
                throw new Error('Lei não encontrada.');
            }
        }
        
    },
};