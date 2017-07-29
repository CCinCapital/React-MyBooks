import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class MyReads extends Component {

	static propTypes = {
		bookShelfs: PropTypes.array.isRequired,
	}

	constructor() {
		super()
		this.state = {
			bookShelfs: []
		}
	}

	bookShelfs= []

/* MOUNTING: load order
These methods are called 
when an instance of a component is being created and inserted into the DOM:
	.constructor()
	.componentWillMount()
	.render()
	.componentDidMount()
*/

/* UPDATING: load order
An update can be caused by changes to props or state.
These methods are called when a component is being re-rendered:
	.componentWillReceiveProps(nextProps)
	.shouldComponentUpdate(nextProps, nextState)
	.componentWillUpdate(nextProps, nextState)
	.render()
	.componentDidUpdate(prevProps, prevState)
*/

/* UNMOUNTING: 
This method is called when a component is being removed from the DOM:
	.componentWillUnmount()
*/
	componentWillMount() {
		this.bookShelfs=this.props.bookShelfs
	}

	componentWillReceiveProps(nextProps) {
		this.bookShelfs = nextProps.bookShelfs
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
			// SKIP BooksAPI update and state update
			return null
		}
		BooksAPI.update(book, toShelf)
		this.setState({ bookShelfs: this.bookShelfs })
		return null
	}

	moveBookFromOneShelfToAnother(book, fromShelf, toShelf) {
		this.removeBookFromShelf(book, fromShelf)
		this.addBookToShelf(book, toShelf)	
	}

	removeBookFromShelf(bookToRemove, fromShelf) {
		this.bookShelfs.map(
			(bookShelf, key) => {
				if (bookShelf.indicator === fromShelf) {
					bookShelf.books = bookShelf.books.filter((book) => book !== bookToRemove)
				}
				return bookShelf
			}
		)
	}

	addBookToShelf(book, toShelf) {
		this.bookShelfs.map(
			(bookShelf, key) => {
				if (bookShelf.indicator === toShelf) {
					bookShelf.books = bookShelf.books.concat(book)
				}
				return bookShelf
			}
		)
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
						this.props.bookShelfs.map((bookShelf) => 
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