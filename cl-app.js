#! /usr/bin/env node
var tureng = require('./tureng.js'),
    Table  = require('cli-table');
tureng(process.argv[2], function(error, data) {
	var table = new Table({
		head:['Category','English','Turkish']
	}) ;
	if(error) {
		table.push([error.message, '']);
	} else {
		data.categories.forEach(function (category) {
			category.results.forEach(function (result) {
				table.push([category.name, result.type +' '+ result.english, result.turkish]);
			});
		});
	}
	console.log(table.toString());
});
