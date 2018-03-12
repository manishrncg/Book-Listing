import React from 'react';
import ReactDOM from 'react-dom';

class AddReviewForm extends React.Component{

	addReviewToBook(e){
		e.preventDefault();
		let newData = {review: this.bookReview.value, rating: this.bookRating.value};
		this.props.handleReview(newData, this.props.index, this.props.isbn);
		this.bookReview.value = '';
		this.bookRating.value = '';
	}

	render (){
		return(
			<div>
				<form onSubmit={ e => this.addReviewToBook(e)}>
					<h3>Add review here</h3>
					<p></p>
					<input type="text" name="bookReview" placeholder="Enter review" ref={ input => { this.bookReview = input }}/>
					<select name="bookRating"  ref={ input => { this.bookRating = input }}>
						<option value=""> Select rating </option>
						<option value="1"> 1 star </option>
						<option value="2"> 2 star </option>
						<option value="3"> 3 star </option>
						<option value="4"> 4 star </option>
						<option value="5"> 5 star </option>
					</select>
					<input type="submit" />
				</form>
			</div>);
	}
}

export default AddReviewForm;