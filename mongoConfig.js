const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Joseph-Were-Website-db:Josboy%40254@cluster0.nzyrozb.mongodb.net/Joseph-Were-Website-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = db;
