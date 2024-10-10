const mongoose = require('mongoose');
const mysql = require('mysql2'); 

const connectMongoDB = async () => {
    try {
      console.log('MONGODB_URI:', process.env.MONGODB_URI);
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB conectado com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
    }
  };
  
  module.exports = { connectMongoDB };
  
const connectMySQL = () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            process.exit(1);
        }
        console.log('Conectado ao MySQL');
    });

    return connection;
};

module.exports = {
    connectMongoDB,
    connectMySQL,
};
