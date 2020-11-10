const app = require('./app');
const mongoose = require('mongoose');

init();

async function init() {
  try {
    mongoose.connect('mongodb://localhost:27017/nodeapi', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }, () => {
        console.log("Conectado ao Mongo na porta 27017")
    });
    
    app.listen(3001, () => {
      console.log('Express rodando na orta 3001');
    });
  } catch (error) {
    console.error(`Ocorreu um erro: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}