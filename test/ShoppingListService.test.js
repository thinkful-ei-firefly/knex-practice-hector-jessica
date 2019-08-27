'use strict';
require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');
const ShoppingListService = require('../src/ShoppingListService');
const knex = require('knex');

describe ('Shopping List DB Services Object', () => {
  let db;

  const newItem = {name: 'potatoes', price: 3.70, category: 'Main'};

  before(() =>{
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL_TEST
    });
  });

  after(() => db.destroy());

  describe('getAllItems', () => {

    it('returns an array', () => {
      return ShoppingListService.getAllItems(db)
        .then(res => {
          expect(res).to.be.an('array');
        });
    });

    it('should include objects with given keys', () => {
      return ShoppingListService.getAllItems(db)
        .then(res => {          
          expect(res[0]).to.have.all.keys('id', 'name', 'price', 'date_added', 'checked', 'category');
        });
    });

  });

  describe('insertNewItem', () => {

    it('inserts the given item with appropriate keys into the database', () => {
      return ShoppingListService.insertNewItem(db, newItem)
        .then( res => {
          expect(res[0]).to.have.all.keys('id', 'name', 'price', 'date_added', 'checked', 'category');
          expect(res[0].name).to.equal(newItem.name);
          expect(parseFloat(res[0].price)).to.equal(newItem.price);
          expect(res[0].category).to.equal(newItem.category);
        });          
    });
    
  }); 

  describe('updateItem', () => {}); 

  describe('deleteItem', () => {}); 

});