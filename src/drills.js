'use strict';
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('connection successful!');

knexInstance.from('shopping_list')
  .select('*')
  .then(res => console.log(res));