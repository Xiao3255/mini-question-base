module.exports = (app) => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/mini-question-base', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

require('require-all')(__dirname + '/../models');
