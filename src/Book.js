import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from './DropDownMenu'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		options: PropTypes.array.isRequired,
		callBackFromParent: PropTypes.func.isRequired
	}

	callBack = (childrenData) => {
		this.props.callBackFromParent({
			book: this.props.book,
			toShelf: childrenData
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

	shouldComponentUpdate(nextProps, nextState){
		return this.props !== nextProps
	}

	render() {
		try {
			return (
				<li>
					<div className="book">
						<div className="book-top">
							<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+this.loadThumbnail(this.props.book)+'")' }}></div>
							<div className="book-shelf-changer">
								<DropDownMenu 
									callBackFromParent={this.callBack}
									selected={this.props.book.shelf}
									options={this.props.options}
								></DropDownMenu>
							</div>
						</div>
						<div className="book-title">{this.props.book.title}</div>
						<div className="book-authors">{this.loadAuthors(this.props.book)}</div>
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