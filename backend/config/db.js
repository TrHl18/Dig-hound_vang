const mongoose = require('mongoose');

const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en la conexion: ${url}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = db;