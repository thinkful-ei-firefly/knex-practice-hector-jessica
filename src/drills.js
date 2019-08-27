'use strict';
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('connection successful!');


function searchByText (searchTerm) {
  return knexInstance.from('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => console.log(res))
    .catch(err => console.log(err.message))
    .finally(() => knexInstance.destroy());
}

function paginateItems (pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  return knexInstance.from('shopping_list')
    .select('*')
    .limit(itemsPerPage)
    .offset(offset)
    .then(results => console.log(results))
    .catch(err => console.log(err.message))
    .finally(() => knexInstance.destroy());
}

function searchByAge (daysAgo) {
  return knexInstance.from('shopping_list')
    .select('*')
    // eslint-disable-next-line quotes
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then (res => console.log(res))
    .catch(err => console.log(err.message))
    .finally(() => knexInstance.destroy());
}

function totalCostByCategory () {
  return knexInstance.from('shopping_list')
    .select('category')
    .groupBy('category')
    .sum('price as total')
    .then(res => console.log(res))
    .finally(() => knexInstance.destroy());
}

//searchByText('bacon');
//paginateItems(2);
//searchByAge(3);
totalCostByCategory();