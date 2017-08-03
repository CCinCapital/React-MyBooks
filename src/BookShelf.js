import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		bookShelf: PropTypes.object.isRequired,
		unSortedBooks: PropTypes.array.isRequired,
		bookDropDownMenu: PropTypes.array.isRequired,
		callBackFromParent: PropTypes.func.isRequired
	}

	callBack = (childrenData) => {
		this.props.callBackFromParent({
			book: childrenData.book,
			fromShelf: this.props.bookShelf.value,
			toShelf: childrenData.toShelf
		})
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.props !== nextProps
	}

	displayBooks() {
		if(this.props.bookShelf.value === 'none') {
			return this.props.unSortedBooks.map((book) =>
				<Book
					key={book.id}
					book={book}
					options={this.props.bookDropDownMenu}
					callBackFromParent={this.callBack}
				></Book>
			)
		} 
		else {
			return this.props.unSortedBooks.filter((book) => 
				book.shelf === this.props.bookShelf.value 
			).map((book) =>
				<Book
					key={book.id}
					book={book}
					options={this.props.bookDropDownMenu}
					callBackFromParent={this.callBack}
				></Book>
			)
		}	
	}

	render() {
		return (
			<div key={ this.props.bookShelf.value } className="bookshelf">
				<h2 className="bookshelf-title">{ this.props.bookShelf.name }</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{
							this.displayBooks()
						}
					</ol>
				</div>
			</div>	
		)		
	}
}

export default BookShelf