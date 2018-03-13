import React from 'react';
import AddReviewForm from './AddReviewForm';
import DisplayBookReviews from './DisplayBookReviews';

class Book extends React.Component{

	render (){
		return(
				<li className="fifteen inline enclosedBorder fixedBookHeight">
					<h3>Book name - {this.props.name}</h3>
					<p><b>ISBN no.</b> - {this.props.id}</p>
					<p><b>User</b> - {this.props.username}</p>
					<br /> <hr />
					<h4 className="reviewMargin">Reviews</h4>
					<div className="reviewShowLimited">
					{
						Object
						.keys(this.props.review)
						.map(
							i => <DisplayBookReviews key={i} index={i} review={this.props.review[i]}/>
							)
					}
					</div>
					<AddReviewForm name={this.props.name} id={this.props.id} index={this.props.index} isbn={this.props.id} handleReview={this.props.onSubmit}/>

				</li>

			);
	}
}

export default Book;