import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class MyReads extends Component {

	constructor() {
		super()
		this.state = {			
			bookShelfs : {
				0: {
					name: 'Currently Reading',
					indicator: 'currentlyReading',
					books: []
				},
				1: {
					name: 'Want to Read',
					indicator: 'wantToRead',
					books: []
				},
				2: {
					name: 'Read',
					indicator: 'read',
					books: []
				}
			},
			unSortedBooks: []	
		}
	}

	componentWillMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ unSortedBooks : books })
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state !== nextState) {
			this.sortBooks(nextState.unSortedBooks)
		}
		return this.state !== nextState
	}

	sortBooks(unSortedBooks) {
		Object.values(this.state.bookShelfs).map((bookShelf, i) => 
		{
			let newBookShelfs = this.state.bookShelfs
			newBookShelfs[i].books = unSortedBooks.filter((book) => book.shelf === bookShelf.indicator)
			this.setState({ bookShelfs : newBookShelfs })
			return null
		})
	}	

	callBack = (childrenData) => {
		this.moveBook(childrenData.book, childrenData.fromShelf, childrenData.toShelf)
	}

	moveBook(book, fromShelf, toShelf) {
		if (fromShelf === 'none' && toShelf !== 'none') {
			this.addBookToShelf(book, toShelf)
		} 
		else if (fromShelf !== 'none' && toShelf !== 'none' && fromShelf !== toShelf) {
			this.moveBookFromOneShelfToAnother(book, fromShelf, toShelf)
		}
		else if (fromShelf !== 'none' && toShelf === 'none') {
			this.removeBookFromShelf(book, fromShelf)
		}
		else {
			// SKIP BooksAPI update
			return null
		}
		BooksAPI.update(book, toShelf)
	}

	moveBookFromOneShelfToAnother(book, fromShelf, toShelf) {
		this.removeBookFromShelf(book, fromShelf)
		this.addBookToShelf(book, toShelf)	
	}

	removeBookFromShelf(bookToRemove, fromShelf) {
		let i
		let newBookShelfs = this.state.bookShelfs
		Object.entries(this.state.bookShelfs).map(([key, bookShelf]) => {
			if (bookShelf.indicator === fromShelf) {
				i = key
			}
			return null
		})
		newBookShelfs[i].books = Object.values(this.state.bookShelfs).filter((bookShelf) => bookShelf.indicator === fromShelf)[0].books.filter((book) => book !== bookToRemove)
		this.setState({ bookShelfs : newBookShelfs })
	}

	addBookToShelf(book, toShelf) {
		let i
		let newBookShelfs = this.state.bookShelfs
		Object.entries(this.state.bookShelfs).map(([key, bookShelf]) => {
			if (bookShelf.indicator === toShelf) {
				i = key
			}
			return null
		})
		newBookShelfs[i].books = Object.values(this.state.bookShelfs).filter((bookShelf) => bookShelf.indicator === toShelf)[0].books.concat(book)
		this.setState({ bookShelfs : newBookShelfs })
	}

	render () {
		return (
			<div className="list-books">
	            <div className="list-books-title">
					<h1>MyReads</h1>
           			<Link
           				to="/search"
           				className="open-search"
           			></Link>
	            </div>
	            <div className="list-books-content">
					<div>
						{ 	
						Object.values(this.state.bookShelfs).map((bookShelf) => 
							<BookShelf
								key={bookShelf.indicator}
								bookShelf={bookShelf}
								callBackFromParent={this.callBack}
							></BookShelf>
						)
						}
	            	</div>
           		</div>
           	</div>
		)
	}
}

export default MyReads