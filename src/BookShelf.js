import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
	static propTypes = {
		bookShelf: PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			bookShelf: []
		}
	}

	componentDidMount() {
		this.setState({ bookShelf: this.props.bookShelf })
	}

	loadBookShelf(bookShelf) {
		return(
			<div key={ bookShelf.indicator } className="bookshelf">
				<h2 className="bookshelf-title">{ bookShelf.name }</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.children}
					</ol>
				</div>
			</div>	
		)	
	}

	render() {
		try {
			return (
				this.loadBookShelf(this.state.bookShelf)
			)	
		} catch (e) {
			return (
				<p>No Book Shelf was found.</p>
			)
		}
	}
}

export default BookShelf