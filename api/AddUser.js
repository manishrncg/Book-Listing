function checkReviewExistence(user, connection){
    return new Promise((resolve, reject) => {
      // Do a MySQL query.
      connection.query("SELECT * FROM `users` WHERE `user_name`='"+user+"'", function(err, result) {
          if(result){
            resolve(result.length);
          }
          else{
            reject(err);
          }
      });
    })

}

function AddUser(req, res, connection){
	// Get sent data.
	var user = req.body.username;
  var outputJson = {'status': ''};

	checkReviewExistence(user, connection)
      .then(function(reviewCount){
        outputJson['status'] = reviewCount;
          if(reviewCount==0){
			  // Do a MySQL query.
			  var query = connection.query("INSERT INTO users (`user_name`) VALUES ('"+user+"')", function(err, result) {
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

module.exports = AddUser;