import React from 'react';
import Book from './Book';
import AddBookForm from './AddBookForm';
import {apiEndPoint} from '../../config/config';
import { getCookie } from '../../utils';
import axios from 'axios';

class BookStore extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: {}
		};

		this.addNewBook = this.addNewBook.bind(this);
		this.addReview = this.addReview.bind(this);
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

	/*
	* checks if book already present
	* else adds book
	* @param 'bookData' contains book properties
	*/
	addNewBook(bookData){
		let prevISBNcheck = Object.keys(this.state.data).filter(obj => obj==bookData.ISBN);

		let data = Object.assign({}, this.state.data);
		data[bookData.ISBN] = bookData;
		if(bookData['name']=='' || bookData.ISBN==''){
			alert('Book name or ISBN no. cannot be empty!');
		}
		else if(prevISBNcheck.length==0){
			this.setState({
				data: data
			});

			this.addBookApi(bookData);
		}
		else{
			alert('Please enter some other book, it already exists!');
		}
	}
	/*
	* calls api to add book
	* @param 'bookData' contains book properties
	*/
	addBookApi(bookData){
	    axios.post(apiEndPoint+'/add-book', {
	      book_id: bookData.ISBN,
	      user_id: getCookie('username'),
	      book_data: bookData

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

	/*
	* checks if user has already reveiew for particular book
	* else adds review
	* @param 'reviewData' contains review properties
	*/
	addReview(reviewData, index, isbn){
			let self = this;

			if(reviewData['review']=='' || reviewData['rating']==''){
				alert('Review or rating cannot be empty!');
			}
			else{
				axios.post(apiEndPoint+'/add-review', {
			      book_id: isbn,
			      user_id: getCookie('username'),
			      review: reviewData
			    })
			    .then(function (response) {
				if(response.data['status']==0){
					let newData = Object.assign({}, self.state.data);
					newData[index].review.push(reviewData);
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
					<AddBookForm onSubmit={this.addNewBook} username={getCookie('username')}/>
				</div>
				);
	}
}

export default BookStore;