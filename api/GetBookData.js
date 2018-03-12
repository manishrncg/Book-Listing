module.exports = function GetBookData(req, res, connection){

  // Do a MySQL query.
    var query = connection.query("SELECT * FROM books WHERE 1", function(err, rows, fields) {

      if(err){
        // res.status(500).send('Error!');
        console.log(err);
      }
      
      res.json(rows); 
  });

}