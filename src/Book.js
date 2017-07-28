import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import DropDownMenu from './DropDownMenu'


class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {
			book: [],
			bookShelf: [],
			toShelf: undefined,
		}
	}

	componentDidMount() {
		this.setState({ book: this.props.book,
						bookShelf: this.props.bookShelf 
					})		
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.toShelf !== undefined && this.state.toShelf !== prevState.toShelf) {
			BooksAPI.update(this.state.book, this.state.toShelf)
		}
	}

	callBack = (childrenData) => {
		this.setState({ toShelf: childrenData })
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

	render() {
		try {
			return (
				<li>
					<div className="book">
						<div className="book-top">
							<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+this.loadThumbnail(this.state.book)+'")' }}></div>
							<div className="book-shelf-changer">
								<DropDownMenu callBackFromParent={this.callBack}>
									<option value="none" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								</DropDownMenu>
							</div>
						</div>
						<div className="book-title">{this.state.book.title}</div>
						<div className="book-authors">{this.loadAuthors(this.state.book)}</div>
					</div>
				</li>			
			)
		} catch (e) {
			return (
				<div>No Results Found.</div>
			)
		}
	}
}

export default Book