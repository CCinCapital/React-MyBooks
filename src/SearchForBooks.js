import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchForBooks extends Component {

	state = {
		query: '',
		books: undefined,
		maxResults: '5'
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.query !== prevState.query) {
			if (this.state.query.length === 0) {
				this.setState({ books: undefined })
			} else {
				BooksAPI.search(this.state.query, this.state.maxResults).then((books) => {
					this.setState({ books: books })
					})				
			}
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
							}}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						<BookShelf
							bookShelf='Search Results'
							books={this.state.books}
						></BookShelf>
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchForBooks