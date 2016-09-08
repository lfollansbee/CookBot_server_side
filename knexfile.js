require('dotenv').load();

module.exports = {
 development: {
   client: 'pg',
   connection: 'postgres://localhost/cookbook'
 },
 production:{
   client: 'pg',
   connection: process.env.DATABASE_URL + '?ssl=true'
 }
};
