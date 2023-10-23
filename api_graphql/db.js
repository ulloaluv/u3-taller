const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lauroluv:kFapXTIVvZ18zOw6@clusternsd.bxyv78j.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ClienteModel = mongoose.model('Cliente', {
  codigo: String,
  nombre: String,
  telefono: String
});

module.exports = ClienteModel