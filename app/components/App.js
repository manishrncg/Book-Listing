import React from 'react';
import Book from './Book';
import AddBookForm from './AddBookForm';
import {apiEndPoint} from '../../config';
import axios from 'axios';

class App extends React.Component{
	constructor(props){
		super(props);
		let data  = [{name: 'Book1', ISBN: 1234588, review: [{review: "j1", rating: "5"}, {review: "j1.1", rating: "5.1"}]}, {name: 'Book2', ISBN: 658686465, review: [{review: "j2", rating: "5"}]}, {name: 'Book3', ISBN: 846312, review: [{review: "j3", rating: "5"}]}, {name: 'Book4', ISBN: 79864443, review: [{review: "j4", rating: "5"}]}];
		this.state = {
			data: data
		};

		this.addNewBook = this.addNewBook.bind(this);
		this.addReview = this.addReview.bind(this);
		this.getCookie = this.getCookie.bind(this);
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

	addNewBook(dataJSON){
		let prevISBNcheck = this.state.data.filter(obj => obj.ISBN==dataJSON.ISBN);
		if(prevISBNcheck.length==0){
			this.setState({
				data: [...this.state.data, dataJSON]
			});

			this.addBookApi(dataJSON);
		}
		else{
			alert('Please enter some other book, it already exists!');
		}
	}

	addBookApi(dataJSON){
		debugger;
	    axios.post(apiEndPoint+'/add-book', {
	      book_id: dataJSON.ISBN,
	      user_id: this.getCookie('username'),
	      book_data: dataJSON

	    })
	    .then(function (response) {
	      console.log(response);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

	addReview(dataJSON, index, isbn){
			this.state.data[index].review.push(dataJSON);
			this.setState({
				data: this.state.data
			});

			axios.post(apiEndPoint+'/add-review', {
		      book_id: isbn,
		      user_id: this.getCookie('username'),
		      review: dataJSON

		    })
		    .then(function (response) {
		      console.log(response);
		    })
		    .catch(function (error) {
		      console.log(error);
		    });
	}

	render (){
		return(<div>
					<div>
						<h1 className="text-center">Book Review Panel</h1>
							<ul>
								{
									Object.keys(this.state.data)
										.map(
											i => <Book key={i} 
													index={i} 
													name={this.state.data[i].name} 
													id={this.state.data[i].ISBN}
													review={this.state.data[i].review} 
													onSubmit={this.addReview}
												/>
										)
								}
							</ul>
						</div>
						<hr />
						<AddBookForm onSubmit={this.addNewBook} />
				</div>
				);
	}
}

export default App;