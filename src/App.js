import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchForBooks from './SearchForBooks'
import MyReads from './MyReads'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

	constructor() {
		super()
		this.state = {			
			unSortedBooks: [],	
			bookShelfs: []
		}
		this.fetchDataFromServer('getAll')
	}

	bookShelfs = [
		{
			name: 'Currently Reading',
			indicator: 'currentlyReading',
			books: []
		},{
			name: 'Want to Read',
			indicator: 'wantToRead',
			books: []
		},{
			name: 'Read',
			indicator: 'read',
			books: []
		}
	]

	componentWillMount() {
		this.setState({ bookShelfs: this.bookShelfs })
	}

	componentWillUpdate(nextProps, nextState) {
		this.sortBooks(nextState.unSortedBooks)
	}

	fetchDataFromServer(arg) {
		if (arg === 'getAll') {
			BooksAPI.getAll().then((books) => {
				this.setState({ unSortedBooks : books })
			})		
		}
	}

	sortBooks(unSortedBooks) {
		this.bookShelfs.map(
			(bookShelf, i) => {
				this.bookShelfs[i].books = unSortedBooks.filter(
					(book) => book.shelf === bookShelf.indicator
				)
				return bookShelf
			}
		)
	}	

	callBack = (childrenData) => {
		BooksAPI.update(childrenData.book, childrenData.toShelf)
		this.fetchDataFromServer('getAll')
	}

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<MyReads
						bookShelfs={this.state.bookShelfs}
					></MyReads>
				)}/>
				<Route exact path="/search" render={({ history }) => (
					<SearchForBooks
						callBackFromParent={this.callBack}
					></SearchForBooks>
				)}/>
			</div>
		)
	}
}

export default BooksApp
