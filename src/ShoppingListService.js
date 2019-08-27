'use strict';
const ShoppingListService = {

  getAllItems (db) {
    return db.from('shopping_list')
      .select('*')
      .catch(err => console.log(err.message));
      
  },

  insertNewItem (db) {},

  updateItem (db) {},

  deleteItem (db) {}

};

module.exports = ShoppingListService;