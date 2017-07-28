import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

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

	showSearchResult() {
		try{
			return (this.state.books.map((book) => 
						<Book
							key={book.industryIdentifiers[0].identifier}
							book={book}
						>
						</Book>
					))		
		} catch (e) {
			return (<p> No Result Found. </p>)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== undefined && this.state.query !== prevState.query) {
			BooksAPI.search(this.state.query, this.state.maxResults).then((books) => {
				this.setState({ books: books })
				})
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
						{this.showSearchResult()}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchForBooks