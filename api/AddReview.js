function checkReviewExistence(data, connection){
    return new Promise((resolve, reject) => {
      // Do a MySQL query.
      connection.query("SELECT * FROM `reviews` WHERE `r_user_name`='"+data[1]+"' AND `book_id`="+data[0], function(err, result) {
          if(result){
            resolve(result.length);
          }
          else{
            reject(err);
          }
      });
    })

}

async function AddReview(req, res, connection){
// Get sent data.
  var data = [req.body.book_id, req.body.user_id, JSON.stringify(req.body.review)];
  var outputJson = {'status': ''};

    checkReviewExistence(data, connection)
      .then(function(reviewCount){
        outputJson['status'] = reviewCount;
          if(reviewCount==0){
            // Get sent data.
              var data = [req.body.book_id, req.body.user_id, JSON.stringify(req.body.review)];
              // Do a MySQL query.

                var query = connection.query("INSERT INTO reviews SET `book_id`=?, `r_user_name`=?, `review`=?", data, function(err, result) {
                  if(err){
                    console.log(err);
                  }
                  outputJson['status'] = reviewCount;
              });
          }
          else{
            outputJson['status'] = reviewCount;
          }
          res.send(JSON.stringify(outputJson));
      })
      .catch(function(reason){
        console.log(reason);
      });

}

module.exports = AddReview;