'use strict';
const ShoppingListService = {

  getAllItems (db) {
    return db.from('shopping_list')
      .select('*')
      .catch(err => console.log(err.message));
      
  },

  insertNewItem (db, newItem) {
    return db.into('shopping_list')
      .insert(newItem)
      .returning('*');
  },

  updateItem (db) {},

  deleteItem (db) {}

};

module.exports = ShoppingListService;