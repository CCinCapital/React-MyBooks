import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		bookShelf: PropTypes.object.isRequired,
		callBackFromParent: PropTypes.func.isRequired
	}

	constructor() {
		super()
		this.state = {
			bookShelf: []
		}
	}

	callBack = (childrenData) => {
		this.props.callBackFromParent({
			book: childrenData.book,
			fromShelf: this.state.bookShelf.indicator,
			toShelf: childrenData.toShelf
		})
	}

	componentDidMount() {
		this.setState({ bookShelf: this.props.bookShelf })
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ bookShelf: nextProps.bookShelf })
	}

	render() {
		console.log(this.state.bookShelf)
		try {
			return (
				<div key={ this.state.bookShelf.indicator } className="bookshelf">
					<h2 className="bookshelf-title">{ this.state.bookShelf.name }</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">
							{
								this.state.bookShelf.books.map((book) =>
									<Book
										key={book.industryIdentifiers[0].identifier}
										book={book}
										callBackFromParent={this.callBack}
									></Book>
								)
							}
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