import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class SearchForBooks extends Component {
	static propTypes = {
		unSortedBooks: PropTypes.array.isRequired,
		bookDropDownMenu: PropTypes.array.isRequired,
		callBackFromParent: PropTypes.func.isRequired
	}

	constructor() {
		super()
		this.state = {
			query: '',
			maxResults: 5,
			unSortedBooks: []
		}
	}
	
	bookShelf= {
		value: 'none'
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	callBack = (childrenData) => {
		this.props.callBackFromParent({
			book: childrenData.book,
			fromShelf: childrenData.fromShelf,
			toShelf: childrenData.toShelf
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.query !== prevState.query) {
			if (this.state.query.length === 0) {
				this.setState({ unSortedBooks : [] })
			} else {
				BooksAPI.search(this.state.query, this.state.maxResults).then((books) => {
					if(books.length !== undefined) {
						books.map((book) => {
							let b = this.props.unSortedBooks.filter((b) => b.id === book.id)
							if(b.length !== 0){
								book.shelf = b.shelf
							} else {
								book.shelf = 'None'
							}
							return null
						})
						this.setState({ unSortedBooks : books })
					} else {
						this.setState({ unSortedBooks : [] })
					} 
				})
			}
		}			
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link 
						to="/React-MyBooks/"
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
							unSortedBooks={this.state.unSortedBooks}
							bookShelf={this.bookShelf}
							bookDropDownMenu={this.props.bookDropDownMenu}
							callBackFromParent={this.callBack}
						></BookShelf>
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchForBooks