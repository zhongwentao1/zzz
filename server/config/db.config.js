const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/zzzdb");

const db = mongoose.connection;
const dbLog = (msg) => {
    console.log(`[DATABASE] [SUCCESS] ${msg}`);
};
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    dbLog('Connected to MongoDB!');
});