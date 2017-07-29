import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchForBooks extends Component {
	
	constructor() {
		super()
		this.state = {
			query: '',
			maxResults: 5,
			bookShelf: {
				name: 'Search Results',
				indicator: 'searchResults',
				books: undefined
			}
		}
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.query !== prevState.query) {
			if (this.state.query.length === 0) {
				let newBookShelf = this.state.bookShelf
				newBookShelf.books = undefined
				this.setState({ bookShelfs : newBookShelf })
			} else {
				BooksAPI.search(this.state.query, this.state.maxResults).then((books) => {
					let newBookShelf = this.state.bookShelf
					newBookShelf.books = books
					this.setState({ bookShelfs : newBookShelf })
				})				
			}
		}			
	}

	callBack = (childrenData) => {
		if (childrenData.toShelf !== 'none') {
			this.addBookToShelf(childrenData.book, childrenData.toShelf)
		}
	}

	addBookToShelf(book, toShelf) {
		BooksAPI.update(book, toShelf)
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
							}}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						<BookShelf
							key={this.state.bookShelf.indicator}
							bookShelf={this.state.bookShelf}
							callBackFromParent={this.callBack}
						></BookShelf>
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchForBooks