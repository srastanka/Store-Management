/*
Name:
	store.model.route

Description:
	Handle requests.

Author:
	Saz
*/

var Item = require('../models/item.model');

module.exports = function(router) {
	//  All requests will go through this route which is used for logging
	router.use(function(req, res, next) {
		//  This console logging function can be saved to a file later.
		console.log('Logger action');
		next();
	});


	router.route('/query/addQuantity/:itemNumber')
		/*
			Add quantity
		*/
		.put(function(req, res) {
			// Find the item, and then update its properties
			Item.findOne({itemNumber: req.body.itemNumber}, function(err, item) {
				if (err) {
					res.send(err);
				} else {
					// Update the properties
					item.cost = req.body.cost.toFixed(2);
					item.desc = req.body.desc;
					item.quantity = item.quantity + req.body.quantity;

					// Save
					item.save(function(err) {
						if (err) {
							res.send(err);
						} else {
							res.json({message: req.body.itemNumber + ' updated and added quantity ' + req.body.quantity });
						}

					});
				}
			});
		});


	router.route('/add/addNewItem/')
		/*
			Adds a new item.

		*/
		.post(function(req, res) {
			var item = new Item();

			item.itemNumber = req.body.itemNumber;
			item.desc = req.body.desc;
			item.quantity = req.body.quantity;
			item.cost = req.body.cost;

				// Save
				item.save(function(err) {
					if (err) {
						res.send(err);
					} else {
						res.json({message: req.body.itemNumber + ' saved.' });
					}
				});
		})


	// Get all items
	router.route('/item')
		/*
			Get all items
		*/
		.get(function(req, res) {
			// Find all items
			Item.find(function(err, items) {
				if (err) {
					res.send(err);
				}
				res.json(items);
			});
		});

	// Route for specific item
	router.route('/item/:itemNumber')
		/*
			Delete an item
		*/
		.delete(function(req, res) {
			Item.remove({itemNumber: req.params.itemNumber}, function(err, item) {
				if (err) {
					res.send(err);
				}
			});
		})

		/*
			Find a specific item
		*/
		.get(function(req, res) {
			Item.findOne({itemNumber: req.params.itemNumber}, function(err, item) {
				if (err) {
					res.send(err);
				}
				// Return single item
				res.json(item);
			});
		})

		/*
			Updates an item.
		*/
		.put(function(req, res) {
			// Find the item, and then update it with the new values
			Item.findOne({itemNumber: req.body.itemNumber}, function(err, item) {
				if (err) {
					res.send(err);
				} else {
					// Update item with the new properties
					item.desc = req.body.desc;
					item.quantity = req.body.quantity;
					item.cost = req.body.cost;

					// Save the updated item
					item.save(function(err) {
						if (err) {
							res.send(err);
						}
						res.json({message: req.body.itemNumber + ' updated.' });
					});
				}
			});
		});

	// Route for subtract
	router.route('/item/subtract/:item')
		.put(function(req, res) {
			Item.update({itemNumber : req.body.itemNumber}, { $inc: { quantity: -req.body.subtract} }, function(err, result){
				 res.json(result);
			});
		});
}
