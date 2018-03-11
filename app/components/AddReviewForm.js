import React from 'react';
import ReactDOM from 'react-dom';

class AddReviewForm extends React.Component{

	addReviewToBook(e){
		e.preventDefault();
		let newData = {review: this.bookReview.value, rating: this.bookRating.value};
		this.props.handleReview(newData, this.props.index, this.props.isbn);
	}

	render (){
		return(
			<div>
				<form onSubmit={ e => this.addReviewToBook(e)}>
					<h3>Add review here</h3>
					<p></p>
					<input type="text" name="bookReview" placeholder="Enter review" ref={ input => { this.bookReview = input }}/>
					<input type="number" name="bookRating" placeholder="Enter rating" ref={ input => { this.bookRating = input }}/>
					<input type="submit" />
				</form>
			</div>);
	}
}

export default AddReviewForm;