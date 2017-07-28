import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListMyReads from './ListMyReads'
import SearchForBooks from './SearchForBooks'

class BooksApp extends Component {
	
	bookShelf = [{
					name: 'Currently Reading',
					indicator: 'currentlyReading'
				},{
					name: 'Want to Read',
					indicator: 'wantToRead'
				},{
					name: 'Read',
					indicator: 'read'
				}]

	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books: books })
		})
	}

	// REMOVE BEFORE DELIVER
	// componentDidUpdate(prevProps, prevState) {
	// 	console.log('APP.js : books :')
	// 	console.log(this.state.books)
	// }

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<ListMyReads
						bookShelf={this.bookShelf}
						books={this.state.books}
					></ListMyReads>
				)}/>
				<Route exact path="/search" render={({ history }) => (
					<SearchForBooks/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
