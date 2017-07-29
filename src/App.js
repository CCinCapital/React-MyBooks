import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchForBooks from './SearchForBooks'
import MyReads from './MyReads'

class BooksApp extends Component {

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<MyReads
					></MyReads>
				)}/>
				<Route exact path="/search" render={({ history }) => (
					<SearchForBooks
					></SearchForBooks>
				)}/>
			</div>
		)
	}
}

export default BooksApp
