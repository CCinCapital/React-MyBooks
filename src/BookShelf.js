import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		bookShelf: PropTypes.string.isRequired
	}

	constructor() {
		super()
		this.state = {
			bookShelf: [],
			books: []
		}
	}

	componentDidMount() {
		this.setState({ bookShelf: this.props.bookShelf,
						books: this.props.books })
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ books: nextProps.books })	
	}

	render() {
		try {
			return (
				<div key={ this.state.bookShelf.indicator } className="bookshelf">
					<h2 className="bookshelf-title">{ this.state.bookShelf }</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
							{this.state.books.map((book)=>
								<Book
									key={book.industryIdentifiers[0].identifier}
									book={book}
									bookShelf={this.state.bookShelf}
								></Book>
							)}
						</ol>
					</div>
				</div>	
			)		
		} catch (e) {
			return (
				<p>No Result was found.</p>
			)
		}
	}
}

export default BookShelf