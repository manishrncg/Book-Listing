function checkIfBookExists(book_id, connection){
    var data = [book_id];
    return new Promise((resolve)=>{
        var query = connection.query("SELECT book_id from books WHERE `book_id`=?", data, function(err, result) {
          if(err){
            return false;          
          }else{
            console.log("else", result);
            if( result && result[0] && result[0]['book_id'] ){
              resolve(true);
            }else{
              resolve(false);
            }
            return true;
          }
        });
    })
}

 async function AddBook(req, res, connection){

    // Get sent data.
    var data = [req.body.book_id, req.body.user_id, JSON.stringify(req.body.book_data)];
    // Do a MySQL query.
    var bookFound = await checkIfBookExists(data[0], connection);
    console.log(data, bookFound);
    var output = {};
    if(!bookFound){
      console.log("adding book");
      var query = connection.query("INSERT INTO books SET `book_id`=?, `b_user_name`=?, `book_data`=?", data, function(err, result) {
          if(err){
            res.status(500).send('Error!');
          }
      });
      output.bookAdded = true;
    }else{
      console.log("not adding book");
      output.bookAdded = false;
      output.bookFound = bookFound;
    }
    console.log("returning")
    var outputJson = JSON.stringify(output);
    res.send(outputJson);
}

module.exports = AddBook;