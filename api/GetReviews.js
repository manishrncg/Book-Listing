module.exports = function GetReviews(req, res, connection){

  // Do a MySQL query.
    var query = connection.query("SELECT b.book_id, r.review FROM `books` b JOIN reviews r ON r.book_id = b.book_id WHERE 1", function(err, rows, fields) {

      if(err){
        // res.status(500).send('Error!');
        console.log(err);
      }
      
      res.json(rows); 
  });

}