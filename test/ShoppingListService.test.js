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

  describe('insertNewItem', () => {}); 

  describe('updateItem', () => {}); 

  describe('deleteItem', () => {}); 

});