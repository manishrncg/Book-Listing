import React from 'react';
import AddReviewForm from './AddReviewForm';
import DisplayBookReviews from './DisplayBookReviews';

class Book extends React.Component{

	render (){
		return(
				<li className="fifteen inline enclosedBorder fixedBookHeight">
					<h3>{this.props.name}</h3>
					<p>ISBN no. - {this.props.id}</p>
					<br /> <hr />
					<h4 className="reviewMargin">Reviews</h4>
					<div className="reviewShowLimited">
					{
						Object
						.keys(this.props.review)
						.map(
							i => <DisplayBookReviews key={i} index={i} review={this.props.review[i]} />
							)
					}
					</div>
					<AddReviewForm name={this.props.name} id={this.props.id} index={this.props.index} isbn={this.props.id} handleReview={this.props.onSubmit}/>

				</li>

			);
	}
}

export default Book;