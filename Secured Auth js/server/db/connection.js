
const monk = require('monk');
const db = monk('mongodb+srv://peter:tw4lhiy4@cluster0-pjjfo.mongodb.net/test?retryWrites=true&w=majority'); //My mongo

// function checkconnection(db) {
// if (db) {
//     console.log('connected');
//     next();
// } else {
//     console.log('canot connect');
//     const error = new Error('canot connect')
//     next(error);
// }    
// }


module.exports = db;
