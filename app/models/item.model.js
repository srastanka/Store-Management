/*
Name:
    item.model

Description:
    Defines the model used for the item document in the db.

    Fields:
    - itemNumber
    - desc: Description
		- quantity
		- cost:	Cost per unit

Author:
    Saz
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Define the model schema
var itemSchema  = new Schema({
	itemNumber: String,
	desc: String,
	quantity: Number,
	cost: Number
});

//  Expose "Item" schema
module.exports = mongoose.model('Item', itemSchema);
