import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchForBooks extends Component {

	state = {
		query: '',
		books: undefined,
		maxResults: '5'
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	handleInput() {
		this.componentDidUpdate()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== undefined && this.state.query !== prevState.query) {
			BooksAPI.search(this.state.query, this.state.maxResults).then((books) => {
				this.setState({ books: books })
				})
		}			
	}

	populateBooks() {
		let thumbnail='undefined'
		let authors='undefined'

		if (this.state.books === undefined || this.state.books.hasOwnProperty('error')) {
			return (
				<p>No Results Found.</p>
			)
		} else {
			return (
				this.state.books.map((book) => 
					<li key={book.industryIdentifiers[0].identifier}>
						{console.log(book)}
						<div className="book">
							<div className="book-top">
							{(() => {
								if (book.hasOwnProperty('imageLinks')) {
									if (book.imageLinks.hasOwnProperty('thumbnail')) {
										thumbnail = book.imageLinks.thumbnail
									}
								} else {
									thumbnail='undefined'
								}
							})()}
								<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+thumbnail+'")' }}></div>
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
							{(() => {
								if (book.hasOwnProperty('authors')) {
									authors = book.authors.map((author) => 
										<div>{author}</div>
									)
								} else {
									authors = 'undefined'
								}
							})()}
							<div className="book-authors">
								{authors}
							</div>
						</div>
					</li>
				)
			)
		}
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link 
						to="/"
						className="close-search" 
					>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={(event) => {
								this.updateQuery(event.target.value)
								this.handleInput()
							}}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.populateBooks()}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchForBooks