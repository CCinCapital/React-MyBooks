import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDownMenu extends Component {
	static propTypes = {
		callBackFromParent: PropTypes.func.isRequired
	}

	constructor() {
		super()
		this.state = {
			value: 'none'
		}
	}

	handleChange = (event) => {
		this.setState({ value: event.target.value })
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.value !== prevState.value) {
			this.props.callBackFromParent(this.state.value)
		}
	}

	render() {
		return (
			<select value={this.state.value} onChange={this.handleChange}>
				{this.props.children}
			</select>
		)
	}
}

export default DropDownMenu