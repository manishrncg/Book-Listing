import React from 'react';
import Book from './Book';
import AddBookForm from './AddBookForm';
import {apiEndPoint} from '../../config/config';
import axios from 'axios';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: {}
		};

		this.addNewBook = this.addNewBook.bind(this);
		this.addReview = this.addReview.bind(this);
	}

	getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	componentWillMount(){
		let self = this;
	    let data;

		axios.post(apiEndPoint+'/get-books')
	    .then(function (response) {
	      console.log(response);
	      let bookData = {};
	      if(response.data){
			response.data
				.map(i => {
					bookData[i.book_id] = JSON.parse(i.book_data),
					bookData[i.book_id]['username'] = i.b_user_name
				});
			self.setState({
				data: bookData
			});
			data = bookData
	      }
	    })
	    .catch(function (error) {
	      console.log(error);
	    });

	    axios.post(apiEndPoint+'/get-reviews')
	    .then(function (response) {
	      console.log(response);
	      if(response.data){
			response.data.map(i => data[i.book_id].review.push(JSON.parse(i.review)));
			self.setState({
				data: data
			});
	      }
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

	addNewBook(dataJSON){
		let prevISBNcheck = Object.keys(this.state.data).filter(obj => obj==dataJSON.ISBN);

		let data = Object.assign({}, this.state.data);
		data[dataJSON.ISBN] = dataJSON;
		if(dataJSON['name']=='' || dataJSON.ISBN==''){
			alert('Book name or ISBN no. cannot be empty!');
		}
		else if(prevISBNcheck.length==0){
			this.setState({
				data: data
			});

			this.addBookApi(dataJSON);
		}
		else{
			alert('Please enter some other book, it already exists!');
		}
	}

	addBookApi(dataJSON){
	    axios.post(apiEndPoint+'/add-book', {
	      book_id: dataJSON.ISBN,
	      user_id: this.getCookie('username'),
	      book_data: dataJSON

	    })
	    .then(function (response) {
	      console.log(response);
	      if(response.data['bookAdded']){
			alert('Book added!');
	      }else if(response.data['bookFound']){
			alert('Book already exists!');
	      }
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

	addReview(dataJSON, index, isbn){
			let self = this;

			if(dataJSON['review']=='' || dataJSON['rating']==''){
				alert('Review or rating cannot be empty!');
			}
			else{
				axios.post(apiEndPoint+'/add-review', {
			      book_id: isbn,
			      user_id: this.getCookie('username'),
			      review: dataJSON
			    })
			    .then(function (response) {
				if(response.data['status']==0){
					let newData = Object.assign({}, self.state.data);
					newData[index].review.push(dataJSON);
					self.setState({
						data: newData
					});

					alert('Review has been added!');
			      }
			      else{
					alert('You have already added the review!');
			      }
			    })
			    .catch(function (error) {
			      console.log(error);
			    });
			}
	}

	render (){
		return(<div>
					<div>
						<h1 className="text-center">Book Review Panel</h1>
						<ul>
							{
								Object.keys(this.state.data).length!=0 &&
								Object.keys(this.state.data)
									.map(
										i => <Book key={i}
												index={i}
												name={this.state.data[i].name}
												id={this.state.data[i].ISBN}
												review={this.state.data[i].review}
												username={this.state.data[i].username}
												onSubmit={this.addReview}
											/>
									)
							}
						</ul>
					</div>
					<hr />
					<AddBookForm onSubmit={this.addNewBook} username={this.getCookie('username')}/>
				</div>
				);
	}
}

export default App;