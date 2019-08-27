'use strict';
require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');
const ShoppingListService = require('../src/ShoppingListService');
const knex = require('knex');

describe ('Shopping List DB Services Object', () => {
  let db;  

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
      const newItem = {name: 'potatoes', price: 3.70, category: 'Main'};
      return ShoppingListService.insertNewItem(db, newItem)
        .then( res => {
          expect(res[0]).to.have.all.keys('id', 'name', 'price', 'date_added', 'checked', 'category');
          expect(res[0].name).to.equal(newItem.name);
          expect(parseFloat(res[0].price)).to.equal(newItem.price);
          expect(res[0].category).to.equal(newItem.category);
        });          
    });

  }); 

  describe('updateItem', () => {

    it('updates the given item to have the designated fields', () => {
      const updatedFields = {price: 999};
      const id = 12;
      return ShoppingListService.updateItem(db, id, updatedFields)
        .then(res => {
          expect(parseFloat(res[0].price)).to.equal(updatedFields.price);
        });
    });

  }); 

  describe('deleteItem', () => {

    it('deletes stuff when I write the correct syntax instead of forgetting it() statements in a test suite', () => {
      const id = 3;
      let expected;
      ShoppingListService.getAllItems(db)
        .then(res => {
          expected = res.filter(item => item.id !==id);
        });        
      return ShoppingListService.deleteItem(db, id)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          expect(allItems).to.deep.equal(expected);
        });
    });
      
   
    

  }); 
  
});