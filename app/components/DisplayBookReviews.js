import React from 'react';

class DisplayBookReviews extends React.Component{
	constructor(props){
		super(props);
	}

	render (){
		let review =this.props.review;
		let index = Number(this.props.index)+1+'.) ';
		return(<div>
					<p>{index+'. Rating: '+review.rating+' star'}</p>
					<p>{'Review: '+review.review}</p>
				</div>
			);
	}
}

export default DisplayBookReviews;