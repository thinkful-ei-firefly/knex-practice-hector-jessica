'use strict';
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('connection successful!');


function searchByText (searchTerm) {
  knexInstance.from('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
}

function paginateItems (pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  knexInstance.from('shopping_list')
    .select('*')
    .limit(itemsPerPage)
    .offset(offset)
    .then(results => console.log(results))
    .catch(err => console.log(err.message));
}

function searchByAge (daysAgo) {
  knexInstance.from('shopping_list')
    .select('*')
    // eslint-disable-next-line quotes
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then (res => console.log(res))
    .catch(err => console.log(err.message));
}

searchByAge(3);