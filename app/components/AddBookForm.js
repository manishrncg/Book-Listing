import React from 'react';
import ReactDOM from 'react-dom';

class AddBookForm extends React.Component{

	addAnotherBook(e, user){
		e.preventDefault();
		let newData = {name: this.bookTitle.value, ISBN: this.bookISBN.value, review:[], username: user};
		this.props.onSubmit(newData);
		this.bookTitle.value = '';
		this.bookISBN.value = '';
	}

	render (){
		console.log(this.props.username);
		return(
			<div>
				<form name="addBookForm" onSubmit={ e => this.addAnotherBook(e, this.props.username)}>
					<h3>Add book here</h3>
					<input type="text" name="bookTitle" placeholder="Enter Book title" ref={ input => { this.bookTitle = input }}/>
					<input type="number" name="bookISBN" placeholder="Enter Book ISBN No." ref={ input => { this.bookISBN = input }}/>
					<input type="submit" />
				</form>
			</div>);
	}
}

export default AddBookForm;