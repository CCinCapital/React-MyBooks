import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			book: [],
			bookShelf: [],
			toShelf: undefined
		}
		this.changeShelf = this.changeShelf.bind(this)
	}

	componentDidMount(prevProps, prevState) {
		this.setState({ book: this.props.book,
						bookShelf: this.props.bookShelf 
					})		
	}

	loadThumbnail(book) {
		if (book.hasOwnProperty('imageLinks')) {
			if (book.imageLinks.hasOwnProperty('thumbnail')) {
				return (book.imageLinks.thumbnail)
			}
		} else {
			return 'undefined'
		}
	}

	loadAuthors(book) {
		if (book.hasOwnProperty('authors')) {
			return (book.authors.map((author) => <div key={author}>{author}</div>))
		} else {
			return 'undefined'
		}
	}

	changeShelf(shelf){
		this.setState({ toShelf : shelf.target.value })
		BooksAPI.update(this.state.book, this.state.toShelf)
	}

	loadBook(book) {
		let thumbnail=this.loadThumbnail(book)
		let authors=this.loadAuthors(book)

		return (
			<li key={book.industryIdentifiers[0].identifier}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+thumbnail+'")' }}></div>
						<div className="book-shelf-changer">
							<select value={this.state.toShelf} onChange={this.changeShelf}>
								<option value="none" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{authors}</div>
				</div>
			</li>			
		)
	}

	render() {
		try {
			return (
				this.loadBook(this.state.book)
			)
		} catch (e) {
			return (
				<p>No Results Found.</p>
			)
		}
	}
}

export default Book