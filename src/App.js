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
			unSortedBooks: []
		}
		this.fetchDataFromServer('getAll')
	}

	bookShelfs = [
		{
			name: 'Currently Reading',
			value: 'currentlyReading',
		},{
			name: 'Want to Read',
			value: 'wantToRead',
		},{
			name: 'Read',
			value: 'read',
		}
	]

	bookDropDownMenu = [
		{
			value: 'None',
			text: 'Move to...',
			disabled: 'disabled'
		},{
			value: 'currentlyReading',
			text: 'Currently Reading',
			disabled: ''
		},{
			value: 'wantToRead',
			text: 'Want to Read',
			disabled: ''
		},{
			value: 'read',
			text: 'Read',
			disabled: ''
		},{
			value: 'none',
			text: 'None',
			disabled: ''
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

	moveBook(book, toShelf) {
		if(book.shelf !== toShelf) {
			BooksAPI.update(book, toShelf).then(() => {
				if(toShelf !== 'none') {
					book.shelf = toShelf
					// Filter out the book and append it to the end of the list
					// so it appears at the end of whatever shelf it was added to.
					this.setState(state => ({
						unSortedBooks: state.unSortedBooks.filter((b) => b.id !== book.id).concat([ book ])
					}))					
				}
				else {
					// Filter out the book
					this.setState(state => ({
						unSortedBooks: state.unSortedBooks.filter((b) => b.id !== book.id)
					}))	
				}
			})
		}
	}

	callBack = (childrenData) => {
		this.moveBook(childrenData.book, childrenData.toShelf)
	}

	render() {
		return (
			<div className="app">
				<Route path="/" render={({ history }) => (
					<MyReads
						unSortedBooks={this.state.unSortedBooks}
						bookShelfs={this.bookShelfs}
						bookDropDownMenu={this.bookDropDownMenu}
						callBackFromParent={this.callBack}
					></MyReads>
				)}/>
				<Route path="/search" render={({ history }) => (
					<SearchForBooks
						unSortedBooks={this.state.unSortedBooks}
						bookDropDownMenu={this.bookDropDownMenu}
						callBackFromParent={this.callBack}
					></SearchForBooks>
				)}/>
			</div>
		)
	}
}

export default BooksApp
