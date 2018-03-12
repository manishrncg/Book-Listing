module.exports = function AddReview(req, res, connection){

  // Get sent data.
  var data = [req.body.book_id, req.body.user_id, JSON.stringify(req.body.review)];
  // Do a MySQL query.

    var query = connection.query("INSERT INTO reviews SET `book_id`=?, `r_user_name`=?, `review`=?", data, function(err, result) {
// console.log(result['affectedRows']);
      if(err){
        // res.status(500).send('Error!');
        console.log(err);
      }
      let outputJson = JSON.stringify({'status': result['affectedRows']});
      res.send(outputJson);
  });

}