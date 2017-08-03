import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class MyReads extends Component {

	static propTypes = {
		unSortedBooks: PropTypes.array.isRequired,
		bookShelfs: PropTypes.array.isRequired
	}

	callBack = (childrenData) => {
		this.props.callBackFromParent({
			book: childrenData.book,
			fromShelf: childrenData.fromShelf,
			toShelf: childrenData.toShelf
		})
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.props !== nextProps
	}

	render () {
		return (
			<div className="list-books">
	            <div className="list-books-title">
					<h1>MyReads</h1>
           			<Link
           				to="/search"
           				className="open-search"
           			></Link>
	            </div>
	            <div className="list-books-content">
					<div>
						{ 	
							this.props.bookShelfs.map((bookShelf) => 
								<BookShelf
									key={bookShelf.value}
									bookShelf={bookShelf}
									unSortedBooks={this.props.unSortedBooks}
									bookDropDownMenu={this.props.bookDropDownMenu}
									callBackFromParent={this.callBack}
								></BookShelf>
							)
						}
	            	</div>
           		</div>
           	</div>
		)
	}
}

export default MyReads