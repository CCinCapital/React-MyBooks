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

	/**
	* @description Fetch data from server accordingly
	* @param {string} arg
	* @returns Nothing
	*/
	fetchDataFromServer(arg) {
		if (arg === 'getAll') {
			BooksAPI.getAll().then((books) => {
				this.setState({ unSortedBooks : books })
			})		
		}
	}

	/**
	* @description Sort unSortedBooks into bookShelfs
	* @param {array} unSortedBooks
	* @returns Nothing
	*/
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
		this.fetchDataFromServer('getAll')
	}

	componentWillMount() {
		this.setState({ bookShelfs: this.bookShelfs })
	}

	componentWillUpdate(nextProps, nextState) {
		this.sortBooks(nextState.unSortedBooks)
	}

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={({ history }) => (
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
