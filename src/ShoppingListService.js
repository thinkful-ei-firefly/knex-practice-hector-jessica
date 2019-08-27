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
      .returning('*')
      .catch(err => console.log(err.message));
  },

  updateItem (db, id, updatedFields) {
    return db.from('shopping_list')
      .where({ id })
      .update(updatedFields)
      .returning('*')
      .catch(err => console.log(err.message));
  },

  deleteItem (db, id) {
    return db.from('shopping_list')
      .where({ id })
      .delete();
  }

};

module.exports = ShoppingListService;