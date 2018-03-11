const mysql = require('mysql');

// Set up connection to database.
module.exports = {
	createDBConnection: function(){
		mysql.createConnection({
		  host: 'localhost',
		  user: 'root',
		  password: '',
		  database: 'book_panel',
		})
		}
}

