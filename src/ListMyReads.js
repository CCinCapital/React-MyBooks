import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListMyReads extends Component {
	static propTypes = {
		bookShelf: PropTypes.array.isRequired,
		books: PropTypes.array.isRequired
	}

	populateBookShelf() {
		return (
			this.props.bookShelf.map((bookShelf) => 
				<div key={bookShelf.indicator} className="bookshelf">
					<h2 className="bookshelf-title">{ bookShelf.name }</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
							{this.populateBooks(bookShelf.indicator)}
						</ol>
					</div>
				</div>
			)
		)
	}

	populateBooks(bookShelf) {
		return (
			this.props.books.filter((book) => book.shelf===bookShelf).map((book) => 
				<li key={book.industryIdentifiers[0].identifier}>
					<div className="book">
						<div className="book-top">
							<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+book.imageLinks.thumbnail+'")' }}></div>
							<div className="book-shelf-changer">
								<select>
									<option value="none" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								</select>
							</div>
						</div>
						<div className="book-title">{book.title}</div>
						{book.authors.map((author) => 
							<div key={author} className="book-authors">{
								author}
							</div>
						)}
					</div>
				</li>
			)
		)
	}

	render() {
		return (
			<div className="list-books">
	            <div className="list-books-title">
					<h1>MyReads</h1>
           			<Link
           				to="/search"
           				className="list-books-title-add"
           			></Link>

	            </div>
	            <div className="list-books-content">
					<div>
						{this.populateBookShelf()}
	            	</div>
           		</div>
           	</div>
		)
	}
}

export default ListMyReads