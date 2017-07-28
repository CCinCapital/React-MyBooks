import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import Book from './Book'

class ListMyReads extends Component {
	static propTypes = {
		bookShelf: PropTypes.array.isRequired,
		books: PropTypes.array.isRequired
	}

	render() {
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
							this.props.bookShelf.map((bookShelf)=>
								<BookShelf
									key={bookShelf.indicator}
									bookShelf={bookShelf}
								>{
									this.props.books.filter((book) => book.shelf === bookShelf.indicator).map((book)=>
										<Book
											key={book.industryIdentifiers[0].identifier}
											book={book}
											bookShelf={bookShelf}
										></Book>
									)
								}</BookShelf>
							)
						}
	            	</div>
           		</div>
           	</div>
		)
	}
}

export default ListMyReads